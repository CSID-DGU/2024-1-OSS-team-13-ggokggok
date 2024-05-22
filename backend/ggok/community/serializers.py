from community.models import Post, Comment
from rest_framework import serializers

class CommunityPostSerializer(serializers.ModelSerializer):
    voter = serializers.PrimaryKeyRelatedField(read_only=True, many=True)

    class CommunityPostSerializer(serializers.ModelSerializer):
        class Meta:
            model = Post
            fields = '__all__'
            extra_kwargs = {
                'image': {'required': False}  # 이미지 필드를 선택사항으로 설정
            }


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