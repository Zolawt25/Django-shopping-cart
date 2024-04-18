from .views import ProductDetailApiView, ProductListApiView
from django.urls import path






urlpatterns = [
    path("", ProductListApiView.as_view(), name="products_list"),
    path("<int:pk>/", ProductDetailApiView.as_view(), name="products_detail"),
]
