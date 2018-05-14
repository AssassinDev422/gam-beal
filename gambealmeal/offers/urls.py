from django.conf.urls import url, include
from rest_framework import routers, serializers, viewsets

from .views import OfferViewSet, ReceiptViewSet

router = routers.DefaultRouter()
router.register(r'offers', OfferViewSet, base_name='offers')
router.register(r'receipts', ReceiptViewSet, base_name='receipts')

urlpatterns = [
    url(r'^', include(router.urls)),
]
