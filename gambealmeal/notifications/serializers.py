from rest_framework import routers, serializers, viewsets

from .models import Registration
import random
from datetime import datetime
import pytz
import boto3, os

sns = boto3.client('sns', region_name="us-west-2")

class RegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Registration
    def create(self, validated_data):
        token = validated_data['device_token']
        objs = Registration.objects.filter(device_token=token)
        if len(objs)>0:
            return objs[0]
        arn = sns.create_platform_endpoint(    
            PlatformApplicationArn=os.getenv('AWS_SNS_APP', ''),
            Token=token)['EndpointArn']
        validated_data['arn'] = arn
        sub_arn = sns.subscribe(
            TopicArn=os.getenv('AWS_SNS_TOPIC', ''),
            Protocol='application',
            Endpoint=arn
        )['SubscriptionArn']
        validated_data['subscription_arn'] = sub_arn
        return Registration.objects.create(**validated_data)
