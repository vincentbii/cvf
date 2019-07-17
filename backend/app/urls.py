from django.urls import include, path
from rest_framework import routers
from app import views
from rest_framework.urlpatterns import format_suffix_patterns

router = routers.DefaultRouter()
router.register(r'reorders', views.ReorderViewSet)
router.register(r'inventory', views.InventoryViewSet)
router.register(r'sales', views.SaleViewSet)
urlpatterns = [
    path('', include(router.urls))
]