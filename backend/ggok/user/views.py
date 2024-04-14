from django.shortcuts import render
# Create your views here.
from django.contrib.auth import authenticate, login, logout
from rest_framework.decorators import api_view
from rest_framework.response import Response
from user.forms import UserForm

@api_view(['POST'])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        return Response({'detail': '로그인 성공'})
    else:
        return Response({'detail': '유효하지 않은 인증 정보'}, status=400)

@api_view(['POST'])
def logout_view(request):
    logout(request)
    return Response({'detail': '로그아웃 성공'})

@api_view(['POST'])
def signup_view(request):
    if request.method == "POST":
        form = UserForm(request.data)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=raw_password)
            login(request, user)
            return Response({'detail': '회원가입 및 로그인 성공'})
    return Response(form.errors, status=400)
