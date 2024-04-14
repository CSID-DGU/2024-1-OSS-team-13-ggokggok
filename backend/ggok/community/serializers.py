from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Post, Comment
#from .serializers import PostSerializer
from rest_framework import serializers, viewsets

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'
class PostSerializer(serializers.ModelSerializer):
    comment = CommentSerializer(many=True, read_only=True)  # comment 필드 추가

    class Meta:
        model = Post
        fields = '__all__'

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer