from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags

from rest_framework import routers, serializers, viewsets

from accounts.serializers import UserSerializer
from accounts.models import CustomUser
from businesses.serializers import BusinessSerializer
from .models import Offer, Receipt
from businesses.models import Business, Rating
from .validators import LessThanFiveTrue
import random
from datetime import datetime
import pytz

class OfferSerializer(serializers.ModelSerializer):
    business = BusinessSerializer(many=False, read_only=True)
    business_id = serializers.PrimaryKeyRelatedField(source='business', queryset=Business.objects.all())
    featured = serializers.BooleanField(validators=[LessThanFiveTrue(queryset=Offer.objects.all())])
    class Meta:
        model = Offer
        depth = 1

class ReceiptSerializer(serializers.ModelSerializer):
    user = UserSerializer(many=False, read_only=True)
    offer = OfferSerializer(many=False, read_only=True)
    user_id = serializers.PrimaryKeyRelatedField(source='user', queryset=CustomUser.objects.all())
    offer_id = serializers.PrimaryKeyRelatedField(source='offer', queryset=Offer.objects.all())
    class Meta:
        model = Receipt
        depth = 2
    

    def create(self, validated_data):
        user = validated_data['user']
        offer = validated_data['offer']
        receipt = None
        if offer.redeemable_quantity > 0:
            if offer.offer_type == "fixed":
                if offer.surge_start < datetime.now(pytz.utc) < offer.surge_end:
                    validated_data['money_earned'] = offer.min_reward * offer.surge_multiplier
                else:
                    validated_data['money_earned'] = offer.min_reward
                receipt = Receipt.objects.create(**validated_data)
            elif offer.offer_type == "variable":
                options = [elem for elem in offer.variable_rewards if int(elem['users'])>0]
                random.shuffle(options)
                if len(options)>0:
                    options[0]['users'] = int(options[0]['users']) - 1
                    validated_data['money_earned'] = float(options[0]['prize'])
                    receipt = Receipt.objects.create(**validated_data)
                    offer.variable_rewards = options
        if receipt:
            offer.redeemable_quantity -= 1
            offer.save()
            user.pending_money += receipt.money_earned
            user.offers_redeemed += 1
            user.save()
            return receipt
        else:
            return None
    

    def update(self, instance, validated_data):
        new_status = validated_data.get('status', instance.status)
        money_earned = validated_data.get('money_earned', instance.money_earned)
        user = validated_data.get('user', instance.user)
        # print('-------- ReceiptSerializer update ------')
        # print('receipt id', instance.id)
        # print('receipt status', instance.status)
        # print('new status', new_status)
        # print('money', money_earned)
        # print('user name', user.first_name)
        if instance.status != new_status:
            if new_status == "approved":
                if instance.status == "open":
                    user.pending_money -= money_earned
                    user.available_money += money_earned
                    user.lifetime_earnings += money_earned
                    user.save()
                else:
                    user.available_money += money_earned
                    user.lifetime_earnings += money_earned
                    user.save()
            elif new_status == "denied":
                if instance.status == "open":
                    user.pending_money -= money_earned
                    user.save()
                else:
                    user.available_money -= money_earned
                    user.lifetime_earnings -= money_earned
                    user.save()
            else:
                if instance.status == "denied":
                    user.pending_money += money_earned
                    user.save()
                else:
                    user.available_money -= money_earned
                    user.lifetime_earnings -= money_earned
                    user.pending_money += money_earned
                    user.save()

            # Send Email
            if new_status == "approved":
                subject, from_email= 'Chyeaa! you just earned cash with Gambeal transaction ' + str(instance.id), 'support@gambeal.com'
                html_content = render_to_string(
                    'requestapproved.html', 
                    {
                        'var_name': instance.user.first_name,
                        'var_date': instance.submit_time,
                        'var_category': instance.offer.business.business_name,
                        'var_status': new_status,
                        'var_money': instance.money_earned,
                        'var_rating_score': instance.rating.rating if instance.rating else '',
                        'var_rating_wouldreturn': instance.rating.would_return if instance.rating else '',
                        'var_rating_comments': instance.rating.comments if instance.rating else ''
                    }) # render with dynamic value
                text_content = strip_tags(html_content)
                msg = EmailMultiAlternatives(subject, text_content, from_email, [instance.user.email])
                msg.attach_alternative(html_content, "text/html")
                if instance.user.email == 'solodkiyruslan9@yandex.ru' or instance.user.email == 'qoshibotu@gmail.com':
                    msg.send()
            else:
                subject, from_email= 'Your Gambeal receipt request was declined', 'support@gambeal.com'
                html_content = render_to_string(
                    'requestdeclined.html', 
                    {
                        'var_name': instance.user.first_name,
                        'var_receiptid': instance.id
                    }) # render with dynamic value
                text_content = strip_tags(html_content)
                msg = EmailMultiAlternatives(subject, text_content, from_email, [instance.user.email])
                msg.attach_alternative(html_content, "text/html")
                if instance.user.email == 'solodkiyruslan9@yandex.ru' or instance.user.email == 'qoshibotu@gmail.com':
                    msg.send()

        return super(ReceiptSerializer, self).update(instance, validated_data)



class RatingSerializer(serializers.ModelSerializer):
    user = UserSerializer(many=False, read_only=True)
    business = BusinessSerializer(many=False, read_only=True)
    receipt = ReceiptSerializer(many=False, read_only=True)
    business_id = serializers.PrimaryKeyRelatedField(source='business', queryset=Business.objects.all())
    user_id = serializers.PrimaryKeyRelatedField(source='user', queryset=CustomUser.objects.all())
    receipt_id = serializers.PrimaryKeyRelatedField(source='receipt', queryset=Receipt.objects.all())
    class Meta:
        model = Rating
    def create(self, validated_data):
        receipt = validated_data.pop('receipt')
        rating = Rating.objects.create(receipt=receipt, **validated_data)
        receipt.rating = rating
        receipt.save()

        # print('---------- Created Receipt --------------')
        # print('id', receipt.id)
        # print('money', receipt.money_earned)
        # print('firstname', user.first_name)
        # print('date', receipt.submit_time)
        # print('category', receipt.offer.business.business_name)
        # Send Receipt request
        subject, from_email= 'We have received your Gambeal transaction request ' + str(receipt.id), 'support@gambeal.com'
        html_content = render_to_string(
            'submitreceipt.html', 
            {
                'var_name': receipt.user.first_name,
                'var_date': receipt.submit_time,
                'var_category': receipt.offer.business.business_name,
                'var_status': receipt.status,
                'var_money': receipt.money_earned,
                'var_rating_score': rating.rating,
                'var_rating_wouldreturn': rating.would_return,
                'var_rating_comments': rating.comments
            }) # render with dynamic value
        text_content = strip_tags(html_content)
        msg = EmailMultiAlternatives(subject, text_content, from_email, [receipt.user.email])
        msg.attach_alternative(html_content, "text/html")
        if receipt.user.email == 'solodkiyruslan9@yandex.ru' or receipt.user.email == 'qoshibotu@gmail.com':
            msg.send()
        return rating

