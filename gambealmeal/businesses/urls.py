from django.conf.urls import url, include
from rest_framework import routers, serializers, viewsets

from .views import BusinessViewSet, RatingViewSet

router = routers.DefaultRouter()
router.register(r'businesses', BusinessViewSet, base_name='businesses')
router.register(r'ratings', RatingViewSet, base_name='ratings')

urlpatterns = [
    url(r'^', include(router.urls)),
]
