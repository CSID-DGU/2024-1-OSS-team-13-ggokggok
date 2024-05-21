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
    community = serializers.CharField(required=False)
    place = serializers.CharField(required=False)

    def validate(self, data):
        if not data.get('community') and not data.get('place'):
            raise serializers.ValidationError("Either 'community' or 'place' parameter must be provided.")
        return data

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'

class PlacePostSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlacePost
        fields = '__all__'

