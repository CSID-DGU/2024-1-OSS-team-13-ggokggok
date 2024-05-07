from user.models import UserInfo
from rest_framework import serializers

class JoinSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserInfo
        fields = '__all__'

class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserInfo
        fields = 'username', 'password'