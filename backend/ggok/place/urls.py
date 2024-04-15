from django.urls import path
from . import views
from .views import base_views, comment_views, post_views

app_name = 'place'

urlpatterns = [
    # base_views.py
    path('',
         base_views.index, name='index'),
    path('<int:post_id>/',
         base_views.detail, name='detail'),

]