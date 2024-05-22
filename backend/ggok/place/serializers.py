from place.models import PlacePost, PlaceComment
from rest_framework import serializers
class PlaceCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlaceComment
        fields = '__all__'

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
class PlaceCommentVoteSerializer(serializers.ModelSerializer):
    voter = serializers.PrimaryKeyRelatedField(read_only=True, many=True)
    class Meta:
        model = PlacePost
        fields = ['author','voter']