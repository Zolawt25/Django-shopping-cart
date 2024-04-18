from django.shortcuts import render
from rest_framework import generics
from .models import Product
from .serializers import ProductSerializer
from django_filters import rest_framework as filters# Create your views here.

class ProductFilter(filters.FilterSet):
    min_price = filters.NumberFilter(field_name='price', lookup_expr='gte')
    max_price = filters.NumberFilter(field_name='price', lookup_expr='lte')
    search = filters.CharFilter(field_name="name", lookup_expr='icontains')
    # catagories = filters.AllValuesFilter(field_name='name') # use it for catagories 
    class Meta:
        model = Product
        fields = ("min_price", "max_price", "search")


class ProductListApiView(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    # filter_class = ProductFilter
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = ProductFilter
    # search_fields = ["name", "disc"]
    # ordering_fields = ("price",)
    
class ProductDetailApiView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer