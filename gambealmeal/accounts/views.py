from django.conf.urls import url, include
from django.db import models
from django.db.models import Q, F, Count, ExpressionWrapper, Sum, When, Case, Func
from rest_framework import routers, serializers, viewsets, mixins
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from watson import search as watson

from .models import CustomUser, WithdrawRequest
from .serializers import UserSerializer, WithdrawSerializer
from static.permissions import IsAdminOrOwner

class UserViewSet(viewsets.ModelViewSet):
    """ Get the users in the database, 
    can only be altered or accessed by admin.
    """
    base_name = 'user'
    serializer_class = UserSerializer
    permission_classes = (IsAdminUser,)

    def get_queryset(self):
        objects = CustomUser.objects.all()
        search_query = self.request.GET.get('query')
        orderBy = self.request.GET.get('sortBy')
        if orderBy:
            objects = objects.order_by(orderBy)
        if search_query:
            objects = watson.filter(objects, search_query)

        return objects

class WithdrawRequestViewSet(viewsets.ModelViewSet):
    """ Get Withdraw requests or create them,
    can view own, admin can view/edit all
    """
    base_name = 'withdraw'
    serializer_class = WithdrawSerializer
    permission_classes = (IsAdminOrOwner,)

    def get_queryset(self):
        objects = WithdrawRequest.objects.all()
        user = self.request.user
        search_query = self.request.GET.get('query')
        orderBy = self.request.GET.get('sortBy')
        if orderBy:
            objects = objects.order_by(orderBy)
        if search_query:
            objects = watson.filter(objects, search_query)
        if not user.is_staff:
            objects = objects.filter(user = user)
        return objects