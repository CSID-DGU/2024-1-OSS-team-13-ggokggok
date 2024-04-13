from rest_framework.views import APIView
from rest_framework.response import Response
from .models import PlacePost, PlaceComment
#from .serializers import PostSerializer
from rest_framework import serializers, viewsets

class PlaceCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlaceComment
        fields = '__all__'
class PlacePostSerializer(serializers.ModelSerializer):
    comment = PlaceCommentSerializer(many=True, read_only=True)  # comment 필드 추가

    class Meta:
        model = PlacePost
        fields = '__all__'

class PostViewSet(viewsets.ModelViewSet):
    queryset = PlacePost.objects.all()
    serializer_class = PlacePostSerializer

class CommentViewSet(viewsets.ModelViewSet):
    queryset = PlaceComment.objects.all()
    serializer_class = PlaceCommentSerializer