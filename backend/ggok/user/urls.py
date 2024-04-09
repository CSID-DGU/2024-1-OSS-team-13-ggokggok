from django.urls import path
from . import api

app_name = 'user'

urlpatterns = [
    path('logout/', api.LogoutAPIView.as_view(), name='logout'),
    path('signup/', api.SignupAPIView.as_view(), name='signup'),
    path('login/', api.LoginAPIView.as_view(), name='login'),
]
