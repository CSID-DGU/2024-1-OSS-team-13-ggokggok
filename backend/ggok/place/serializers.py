from place.models import PlacePost, PlaceComment
from placesinfo.models import PlaceInfo
from rest_framework import serializers

class PlaceCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlaceComment
        fields = '__all__'

from rest_framework import serializers
from .models import PlacePost

class PlacePostSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlacePost
        fields = '__all__'

    def create(self, validated_data):
        place_post = PlacePost.objects.create(**validated_data)
        return place_post



class PlacePostVoteSerializer(serializers.ModelSerializer):
    voter = serializers.PrimaryKeyRelatedField(read_only=True, many=True)
    class Meta:
        model = PlacePost
        fields = ['voter']
class PlaceCommentPutSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlaceComment
        fields = ['content']
