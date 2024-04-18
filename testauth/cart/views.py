from django.shortcuts import render
from rest_framework import generics
from .models import Cart
from .serializers import CartSerializer
# Create your views here.




class CartListApiView(generics.ListCreateAPIView):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    
class CartDetailApiView(generics.RetrieveDestroyAPIView):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer