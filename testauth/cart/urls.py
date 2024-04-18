from .views import CartDetailApiView, CartListApiView
from django.urls import path






urlpatterns = [
    path("", CartListApiView.as_view(), name="Cart_list"),
    path("<int:pk>/", CartDetailApiView.as_view(), name="Cart_detail"),
]
