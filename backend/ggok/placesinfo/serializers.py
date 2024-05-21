from rest_framework import serializers, generics
from .models import PlaceInfo

class PlaceInfoListSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlaceInfo
        fields = ['id', 'name']  # 명소 상호명(name)만을 포함하도록 수정

class PlaceInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlaceInfo
        fields = '__all__'

