from django.conf.urls import url, include
from django.db import models
from django.db.models import Q, F, Count, ExpressionWrapper, Sum, When, Case, Func
from rest_framework import routers, serializers, viewsets, mixins
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny

from .models import Registration
from .serializers import RegistrationSerializer
from static.permissions import IsAdminOrReadOnly, IsAdminOrOwner, IsAdminOrReadOnlyNoAuth
import boto3, os
from watson import search as watson

sns = boto3.client('sns', region_name="us-west-2")

class RegistrationViewSet(viewsets.ModelViewSet):
    base_name = 'register_for_notifications'
    serializer_class = RegistrationSerializer
    permission_classes = (AllowAny,)

    def get_queryset(self):
        return Registration.object.all()

class ExecuteNotification(APIView):
    """
    View for Executing notifications

    * Requires token authentication
    * Requires admin permissions
    """
    permission_classes = (IsAdminUser,)
    def post(self, request, format=None):
        """
        Return data.
        """
        print('request.data')
        print(request.data)
        msg = request.data['message']
        subj = request.data['subject']
        response = sns.publish(
            TopicArn=os.getenv('AWS_SNS_TOPIC', ''),
            Message=msg,
            Subject=subj,
            MessageStructure='string',
        )

        return Response({'status':response['MessageId']})