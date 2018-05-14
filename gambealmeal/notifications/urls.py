from django.conf.urls import url, include
from rest_framework import routers, serializers, viewsets

from .views import RegistrationViewSet, ExecuteNotification

router = routers.DefaultRouter()
router.register(r'registration', RegistrationViewSet, base_name='register_for_notifications')
# router.register(r'notify', ExecuteNotification, base_name='notify')

urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^notify/', ExecuteNotification.as_view(), name='notify'),
]
