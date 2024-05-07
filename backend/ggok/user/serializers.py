from rest_framework import serializers

class LoginSerializer(serializers.Serializer):
     username = serializers.CharField()
     password = serializers.CharField()


class JoinSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()
    password_check = serializers.CharField()
