from .models import user_info
from rest_framework import serializers, viewsets

class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = user_info
        fields = ['id', 'pw', 'name', 'email', 'region1', 'region2']

class UserViewSet(viewsets.ModelViewSet):
    queryset = user_info.objects.all()
    serializer_class = UserInfoSerializer