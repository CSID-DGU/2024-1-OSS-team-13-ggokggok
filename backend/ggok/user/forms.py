from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from user.models import UserInfo

class UserForm(UserCreationForm):
    #email = forms.EmailField(label="이메일")
    region1 = forms.CharField(label="지역1", required=False)  # 지역1 필드 추가
    region2 = forms.CharField(label="지역2", required=False)  # 지역2 필드 추가
    #username = forms.CharField(label="이름")  # 이름 필드 추가

    class Meta:
        model = UserInfo
        fields = ("username", "password1", "password2", "email", "region1", "region2", "name")  # 지역1, 지역2, 이름 필드 추가

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields.pop('password1')  # 비밀번호 필드 감추기
        self.fields.pop('password2')  # 비밀번호 확인 필드 감추기
