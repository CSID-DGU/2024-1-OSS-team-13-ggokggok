from community.models import Post, Comment
from rest_framework import serializers

class CommunityPostSerializer(serializers.ModelSerializer):
    voter = serializers.PrimaryKeyRelatedField(read_only=True, many=True)
    #image = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    class Meta:
        model = Post
        fields = '__all__'


class CommunityPostVoteSerializer(serializers.ModelSerializer):
    voter = serializers.PrimaryKeyRelatedField(read_only=True, many=True)
    class Meta:
        model = Post
        fields = ['author','voter']
    #CommentSerializer
class CommunityCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'

class CommentPutSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['content']

class CommunityCommentVoteSerializer(serializers.ModelSerializer):
    voter = serializers.PrimaryKeyRelatedField(read_only=True, many=True)
    class Meta:
        model = Post
        fields = ['author','voter']