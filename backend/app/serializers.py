from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import (
    Reorders, Inventory,Sale
)


class InventorySerializers(serializers.ModelSerializer):
    class Meta:
        model = Inventory
        fields = ('__all__')


class ReordersSerializers(serializers.ModelSerializer):
    inventory = serializers.StringRelatedField(read_only=True)
    class Meta:
        model = Reorders
        fields = ['id', 'inventory', 'quantity', 'status']


class SaleSerializers(serializers.ModelSerializer):
    class Meta:
        model = Sale
        fields = ('__all__')