from django.shortcuts import render, redirect
# Create your views here.
from django.contrib.auth import authenticate, login, logout
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from user.forms import UserInfo

# @api_view(['POST'])
# def login_view(request):
#     username = request.data.get('username')
#     password = request.data.get('password')
#     user = authenticate(request, username=username, password=password)
#     if user is not None:
#         login(request, user)
#         return Response({'detail': '로그인 성공'})
#     else:
#         return Response({'detail': '유효하지 않은 인증 정보'}, status=400)
# @api_view(['POST'])
# def logout_view(request):
#     logout(request)
#     return Response({'detail': '로그아웃 성공'})
# @api_view(['POST'])
# def signup_view(request):
#     if request.method == "POST":
#         form = UserForm(request.data)
#         if form.is_valid():
#             form.save()
#             username = form.cleaned_data.get('username')
#             raw_password = form.cleaned_data.get('password1')
#             user = authenticate(username=username, password=raw_password)
#             login(request, user)
#             return Response({'detail': '회원가입 및 로그인 성공'})
#     return Response(form.errors, status=400)

# django 내장 모듈 authenticate, login, logout
# authenticate 함수는 클라이언트로 부터 입력받은 ID와 PASSWORD를 통해서
# 사용자 정보가 저장된 DB 내에서 해당하는 객체가 있는지 검사하고,
# 올바른 경우 해당 사용자 객체를 반환하고, 올바르지 않은경우에는 NONE을 반환한다.

# login 함수는 user 를 로그인 상태로 만들어준다. 즉, authenticate 함수를 통해서
# DB 내에서 반환받은 객체를 받아와서 현제 session 데이터 내에 로그인 데이터를 저장한다.
# 또, 'request.user' 를 사용해서 현재 로그인된 사용자 정보를 가져올 수 있게 해준다.

# logout 함수는 session cookie 에서 클라이언트의 로그인 정보를 삭제해준다.


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate, login, logout
from django.shortcuts import redirect
from .models import UserInfo  # 해당 모델을 사용하는 경우 import 필요

class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return Response({'detail': '로그인 성공'})
        else:
            return Response({'detail': '로그인 실패'}, status=status.HTTP_401_UNAUTHORIZED)

class LogoutView(APIView):
    def post(self, request):
        logout(request)
        return Response({'detail': '로그아웃 성공'})

class JoinView(APIView):
    def post(self, request):
        new_username = request.data.get('username')
        new_password = request.data.get('password')
        new_password_check = request.data.get('password_check')

        if not new_username or not new_password:
            return Response({'error_msg': '아이디 또는 비밀번호를 입력하세요.'}, status=status.HTTP_400_BAD_REQUEST)

        elif new_password != new_password_check:
            return Response({'error_msg': '비밀번호가 서로 같지 않습니다.'}, status=status.HTTP_400_BAD_REQUEST)

        elif UserInfo.objects.filter(username=new_username).exists():
            return Response({'error_msg': '이미 사용중인 아이디입니다.'}, status=status.HTTP_400_BAD_REQUEST)

        new_user = UserInfo.objects.create_user(username=new_username, password=new_password)
        new_user.save()

        return Response({'detail': '회원가입 성공'})
