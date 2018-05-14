from django.conf.urls import url, include
from rest_framework import routers, serializers, viewsets

from .views import UserViewSet, WithdrawRequestViewSet

router = routers.DefaultRouter()
router.register(r'users', UserViewSet, base_name='users')
router.register(r'withdraw', WithdrawRequestViewSet, base_name='withdraw')


urlpatterns = [
    url(r'^', include(router.urls)),
]
