from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags


from rest_framework import routers, serializers, viewsets
from .models import CustomUser, WithdrawRequest
from offers.models import Receipt
from rest_framework.exceptions import APIException

class NotEnoughMoney(APIException):
    status_code = 400
    default_detail = 'Insufficient Funds'

class AmountTooSmall(APIException):
    status_code = 400
    default_detail = 'You must withdraw over $20'

class ShortReceiptSerializer(serializers.ModelSerializer):
    class Meta:
        model = Receipt
        exclude = ('user',)

class ShortWithdrawalSerializer(serializers.ModelSerializer):
    class Meta:
        model = WithdrawRequest
        exclude = ('user',)

class UserSerializer(serializers.ModelSerializer):
    receipts = ShortReceiptSerializer(source = 'receipt_set', many=True, read_only = True)
    withdrawls = ShortWithdrawalSerializer(source = 'withdrawals', many=True, read_only=True)
    class Meta:
        model = CustomUser
        exclude = ('password',)

class ShortUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        exclude = ('password',)

class WithdrawSerializer(serializers.ModelSerializer):
    user = ShortUserSerializer(many=False, read_only=True)
    user_id = serializers.PrimaryKeyRelatedField(source='user', queryset=CustomUser.objects.all())
    class Meta:
        model = WithdrawRequest
        depth = 1


    def create(self, validated_data):
        user = validated_data['user']
        amount = validated_data['amount']
        if user.available_money <= amount:
            raise NotEnoughMoney()
        if amount < 20.0:
            raise AmountTooSmall()
        user.available_money -= amount
        user.save()
        tmp = WithdrawRequest.objects.create(**validated_data)
        # print('---------- Created WidthDraw Request --------------')
        # print('amount', amount)
        # Send email - Withdraw request
        subject, from_email= 'We received your Gambeal withdrawal request ' + str(tmp.id), 'support@gambeal.com'
        html_content = render_to_string(
            'withdrawrequest.html', 
            {
                'var_name': user.first_name
            }) # render with dynamic value
        text_content = strip_tags(html_content)
        msg = EmailMultiAlternatives(subject, text_content, from_email, [user.email])
        msg.attach_alternative(html_content, "text/html")
        if user.email == 'solodkiyruslan9@yandex.ru' or user.email == 'qoshibotu@gmail.com':
            msg.send()
        return tmp


    def update(self, instance, validated_data):
        new_status = validated_data.get('status', instance.status)
        if instance.status != new_status:
            if new_status == "accepted":
                if instance.status == "open":
                    instance.status = "accepted"
                    instance.save()
                    if instance.user.email != 'solodkiyruslan9@yandex.ru':
                        instance.execute()

            # Send email - Withdraw approve or decline
            if new_status == "accepted":
                subject, from_email= 'Your Gambeal withdrawal request ' + str(instance.id) + ' is approved!', 'support@gambeal.com'
                html_content = render_to_string(
                    'withdrawapproved.html', 
                    {
                        'var_name': instance.user.first_name
                    }) # render with dynamic value
                text_content = strip_tags(html_content)
                msg = EmailMultiAlternatives(subject, text_content, from_email, [instance.user.email])
                msg.attach_alternative(html_content, "text/html")
                if instance.user.email == 'solodkiyruslan9@yandex.ru' or instance.user.email == 'qoshibotu@gmail.com':
                    msg.send()
            else:
                subject, from_email= 'Your Gambeal withdrawal request ' + str(instance.id) + ' was declined', 'support@gambeal.com'
                html_content = render_to_string(
                    'withdrawdenied.html', 
                    {
                        'var_name': instance.user.first_name
                    }) # render with dynamic value
                text_content = strip_tags(html_content)
                msg = EmailMultiAlternatives(subject, text_content, from_email, [instance.user.email])
                msg.attach_alternative(html_content, "text/html")
                if instance.user.email == 'solodkiyruslan9@yandex.ru' or instance.user.email == 'qoshibotu@gmail.com':
                    msg.send()

        return super(WithdrawSerializer, self).update(instance, validated_data)