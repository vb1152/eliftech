from django.urls import path, re_path
from django.contrib.auth.decorators import login_required

from . import views

app_name = "elif"

urlpatterns = [
    path('', views.index, name="index"),
    path('api_food', views.api_food, name='api_food'),
    path('cart', views.cart, name='cart')
]
