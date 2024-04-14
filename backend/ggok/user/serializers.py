
from rest_framework import serializers
from .models import user_info

class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = user_info
        fields = ['user_id', 'user_pw', 'user_mail', 'user_name', 'user_region1', 'user_region2']

