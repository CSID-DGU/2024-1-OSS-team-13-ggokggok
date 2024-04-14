from django.urls import path
from . import views
from django.contrib.auth import views as auth_views
app_name = 'user'

urlpatterns = [
    path('logout/', views.login_view.as_view(), name='logout'),
    path('signup/', views.logout_view.as_view(), name='signup'),
    path('login/', auth_views.LoginView.as_view(), name='login'),
]
