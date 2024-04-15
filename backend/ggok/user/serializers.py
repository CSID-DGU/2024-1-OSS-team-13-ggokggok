from .models import UserInfo
from rest_framework import serializers, viewsets

class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserInfo
        fields = ['id', 'password', 'username', 'email', 'region1', 'region2']

class UserViewSet(viewsets.ModelViewSet):
    queryset = UserInfo.objects.all()
    serializer_class = UserInfoSerializer