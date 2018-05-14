from django.db import models
import boto3, os

sns = boto3.client('sns', region_name="us-west-2")

# Create your models here.
class Registration(models.Model):
    arn = models.CharField(max_length=250, default="")
    device_token = models.CharField(max_length=250, default="")
    subscription_arn = models.CharField(max_length=250, default="")
    def delete(self):
        sns.unsubscribe(
            SubscriptionArn=self.subscription_arn
        )
        sns.delete_endpoint(
            EndpointArn=self.arn
        )
        super(Registration, self).delete()