from django.conf.urls import url, include
from django.db import models
from django.db.models import Q, F, Count, ExpressionWrapper, Sum, When, Case, Func
from rest_framework import routers, serializers, viewsets, mixins
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from .models import Offer, Receipt
from .serializers import OfferSerializer, ReceiptSerializer
from static.permissions import IsAdminOrReadOnly, IsAdminOrOwner, IsAdminOrReadOnlyNoAuth

from watson import search as watson

class OfferViewSet(viewsets.ModelViewSet):
    """ Get the offers in the database, 
    can only be altered by admin, but can be read by anyone.
    """
    base_name = 'offers'
    serializer_class = OfferSerializer
    permission_classes = (IsAdminOrReadOnlyNoAuth,)

    def get_queryset(self): 
        """Returns all, optionally paginated offer objects, 
        or can be searched by providing a query parameter.
        """
        objects = Offer.objects.all()

        return objects

    def list(self, request):
        """Returns all, optionally paginated offer objects, 
        or can be searched by providing a query parameter.
        """
        objects = Offer.objects.all()

        search_query = request.GET.get('query')
        ordering = request.GET.get('ordering')
        orderBy = request.GET.get('sortBy')

        if orderBy:
            objects = objects.order_by(orderBy)
        featured = request.GET.get('featured')
        if featured:
            featured = True if featured.lower()=="true" else False
            objects = objects.filter(featured=featured)
        active = request.GET.get('active')
        if active and active == 'all':
            pass
        elif active:
            objects = objects.filter(status=active)
        else:
            objects = objects.filter(status='active')

        if search_query:
            objects = watson.filter(objects, search_query)
        
        if ordering:
            if ordering=="A-Z":
                objects = objects.order_by('business__business_name')
            elif ordering=="Z-A":
                objects = objects.order_by('-business__business_name')
            elif ordering=="reward":
                objects = objects.order_by('-min_reward')
            else:
                objects = objects.order_by('display_order')




        page = self.paginate_queryset(objects)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(objects, many=True)

        return Response(serializer.data)


class ReceiptViewSet(viewsets.ModelViewSet):
    """ Get the receipts in the database, 
    can be altered or viewed by admin or owner.
    """
    base_name = 'receipts'
    serializer_class = ReceiptSerializer
    permission_classes = (IsAdminOrOwner,)

    def get_queryset(self):
        """Returns all, optionally paginated receipt objects, 
        or can be searched by providing a query parameter.
        """
        objects = Receipt.objects.all()
        user = self.request.user
        search_query = self.request.GET.get('query')
        orderBy = self.request.GET.get('sortBy')
        if orderBy:
            objects = objects.order_by(orderBy)
        else:
            objects = objects.order_by('-submit_time')

        if not user.is_staff:
            objects = objects.filter(user = user)

        if search_query:
            objects = watson.filter(objects, search_query)
        return objects

    def list(self, request):
        """Returns all, optionally paginated receipt objects, 
        or can be searched by providing a query parameter.
        """
        return super(ReceiptViewSet, self).list(request)