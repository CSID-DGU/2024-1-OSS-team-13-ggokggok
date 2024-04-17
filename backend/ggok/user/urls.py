from django.urls import path
from .views import LoginView, LogoutView, JoinView
app_name = 'user'

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('join/', JoinView.as_view(), name='join'),
]
