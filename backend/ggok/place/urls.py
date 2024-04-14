from django.urls import path
from . import views

app_name = 'place'

urlpatterns = [
    path('', views.index, name='index'),
]