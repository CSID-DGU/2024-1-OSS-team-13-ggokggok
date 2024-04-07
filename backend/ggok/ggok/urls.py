from django.urls import path
from . import views

app_name = 'ggok'

urlpatterns = [
    path('', views.index, name='index'),
]