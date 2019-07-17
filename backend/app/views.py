from django.shortcuts import render
# from rest_framework.decorators import list_route
from rest_framework.decorators import action
from rest_framework import viewsets, mixins
from .serializers import(
    ReordersSerializers, InventorySerializers, SaleSerializers
)
from .models import (
    Reorders, Inventory, Sale
)
# from rest_framework.decorators import list_route
from django.shortcuts import get_object_or_404
from rest_framework.response import Response


# Create your views here.

class ReorderViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Reorders.objects.all()
    serializer_class = ReordersSerializers

    @action(detail=False, methods=['post'])
    def dispatchOrders(self, request, pk=None):
        # Get Reorder Details
        order = get_object_or_404(self.queryset, pk=request.data['id'])
        inventory = order.inventory.id

        # update Inventory
        Inventory = InventoryViewSet()
        dispatch = Inventory.updateInventory(
            inventory, request.data['quantity'], 'dispatch')
        if dispatch:
            order.status = True
            order.save()

        return Response(True)

    def MakeOrder(self, inventory, quantity):
        create = Reorders.objects.create(
            inventory=get_object_or_404(Inventory.objects.all(), pk=inventory),
            quantity=quantity
        )
        return create


class InventoryViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Inventory.objects.all()
    serializer_class = InventorySerializers

    @action(detail=False, methods=['post'])
    def sell(self, request, pk=None):
        # Reduce Inventory
        sell = self.updateInventory(
            request.data['inventory'], request.data['quantity'], 'sell')
        return Response(sell)

    def updateInventory(self, inventory, quantity, action):
        item = get_object_or_404(self.queryset, pk=inventory)
        item.quantity = item.quantity - \
            quantity if action == 'sell' else item.quantity + quantity
        item.save()

        if action == 'sell' and item.quantity <= item.reorder_level:
            makeOrder = ReorderViewSet()
            makeOrder.MakeOrder(inventory, quantity)

        return True


class SaleViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Sale.objects.all()
    serializer_class = SaleSerializers
