from rest_framework import serializers
from .models import UserInfo

class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserInfo
        fields = ['user_id', 'user_pw', 'user_mail', 'user_name', 'user_region1', 'user_region2']
#이후 user_pw는 안보이도록 수정할것