from .models import Post, Comment
from rest_framework import serializers

class CommunityCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'
class CommunityPostSerializer(serializers.ModelSerializer):
    voter = serializers.PrimaryKeyRelatedField(read_only=True, many=True)
    class Meta:
        model = Post
        fields = '__all__'

