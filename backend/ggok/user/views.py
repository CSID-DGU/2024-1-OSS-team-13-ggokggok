from django.contrib.auth import authenticate, login, logout
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from user.models import UserInfo
from .serializers import LoginSerializer, JoinSerializer
from drf_yasg.utils import swagger_auto_schema


class LoginView(APIView):
    @swagger_auto_schema(request_body=LoginSerializer)
    def post(self, request, *args, **kwargs):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data['username']
            password = serializer.validated_data['password']
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                return Response({'detail': '로그인 성공'})
            else:
                return Response({'detail': '로그인 실패'}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LogoutView(APIView):
    def post(self, request, *args, **kwargs):
        logout(request)
        return Response({'detail': '로그아웃 성공'})


class JoinView(APIView):
    @swagger_auto_schema(request_body=JoinSerializer)
    def post(self, request, *args, **kwargs):
        serializer = JoinSerializer(data=request.data)
        if serializer.is_valid():
            new_username = serializer.validated_data['username']
            new_password = serializer.validated_data['password']
            new_password_check = serializer.validated_data['password_check']

            if new_password != new_password_check:
                return Response({'error_msg': '비밀번호가 서로 같지 않습니다.'}, status=status.HTTP_400_BAD_REQUEST)
            elif UserInfo.objects.filter(username=new_username).exists():
                return Response({'error_msg': '이미 사용중인 아이디입니다.'}, status=status.HTTP_400_BAD_REQUEST)

            UserInfo.objects.create_user(username=new_username, password=new_password)
            return Response({'detail': '회원가입 성공'})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
