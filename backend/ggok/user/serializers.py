from user.models import UserInfo
from rest_framework import serializers

class JoinSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserInfo
        fields = 'username', 'password'
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=255)
    password = serializers.CharField(max_length=128, write_only=True)