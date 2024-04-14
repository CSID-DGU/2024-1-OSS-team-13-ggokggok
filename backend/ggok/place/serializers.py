from rest_framework import serializers
from .models import PlacePost, PlaceComment

class PlaceCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlaceComment
        fields = '__all__'

class PlacePostSerializer(serializers.ModelSerializer):
    comment = PlaceCommentSerializer(many=True, read_only=True)

    class Meta:
        model = PlacePost
        fields = '__all__'

#commit test