from django.conf.urls import url, include
from django.db import models
from django.db.models import Q, F, Count, ExpressionWrapper, Sum, When, Case, Func
from rest_framework import routers, serializers, viewsets, mixins
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from .models import Business, Rating
from .serializers import BusinessSerializer
from offers.serializers import RatingSerializer
from watson import search as watson

from static.permissions import IsAdminOrReadOnly, IsAdminOrOwner

class BusinessViewSet(viewsets.ModelViewSet):
    """ Get the businesses in the database, 
    can only be altered by admin, but can be read by anyone.
    """
    base_name = 'businesses'
    serializer_class = BusinessSerializer
    permission_classes = (IsAdminOrReadOnly,)

    def get_queryset(self):
        """
        This view should return a list of all the businesses.
        """
        objects = Business.objects.all()
        search_query = self.request.GET.get('query')
        orderBy = self.request.GET.get('sortBy')
        if orderBy:
            objects = objects.order_by(orderBy)
        if search_query:
            objects = watson.filter(objects, search_query)
        return objects

class RatingViewSet(viewsets.ModelViewSet):
    """ Get the rating in the database, 
    can only be altered by admin, but can be read by anyone.
    """
    base_name = 'ratings'
    serializer_class = RatingSerializer
    permission_classes = (IsAdminOrOwner,)

    def get_queryset(self):
        """
        This view should return a list of all the ratings
        for the currently authenticated user, or all ratings for an admin.
        """
        objects = Rating.objects.all()
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