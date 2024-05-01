from rest_framework import serializers, generics
from .models import PlaceInfo

class PlaceInfoListSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlaceInfo
        fields = ['id', 'name']  # 명소 상호명(name)만을 포함하도록 수정

class PlaceInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlaceInfo
        fields = ['id', 'name', 'address', 'lat', 'long', 'review']

class PlaceInfoListAPIView(generics.ListAPIView):
    queryset = PlaceInfo.objects.all()
    serializer_class = PlaceInfoListSerializer  # 명소 상호명(name)만을 반환하는 serializer 사용

class PlaceInfoAPIView(generics.RetrieveAPIView):
    queryset = PlaceInfo.objects.all()
    serializer_class = PlaceInfoSerializer  # 모든 명소 정보를 반환하는 serializer 사용