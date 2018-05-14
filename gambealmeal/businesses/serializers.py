from rest_framework import routers, serializers, viewsets

from .models import Business, Rating

from accounts.models import CustomUser

class BusinessSerializer(serializers.ModelSerializer):
    rating = serializers.DictField(read_only=True)
    class Meta:
        model = Business