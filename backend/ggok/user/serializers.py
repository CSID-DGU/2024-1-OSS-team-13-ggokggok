from user.models import UserInfo
from rest_framework import serializers
from community.models import Post
from place.models import PlacePost


class JoinSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserInfo
        fields = 'username', 'password'
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=255)
    password = serializers.CharField(max_length=128, write_only=True)

class UserPostQuerySerializer(serializers.Serializer):
    post = serializers.CharField(required=True)
    author = serializers.CharField(required=True)

    def validate(self, data):
        if not data.get('post') or not data.get('author'):
            raise serializers.ValidationError("Both 'post' and 'userID' must be provided.")
        return data

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'

class PlacePostSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlacePost
        fields = '__all__'


class PlaceInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlacePost
        fields = ['lat', 'long']