from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import authenticate, login, logout
from .serializers import UserInfoSerializer

class LogoutAPIView(APIView):
    def post(self, request):
        logout(request)
        return Response(status=status.HTTP_200_OK)

class SignupAPIView(APIView):
    def post(self, request):
        serializer = UserInfoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class LoginAPIView(APIView):
    def post(self, request):
        user_id = request.data.get('user_id')
        user_pw = request.data.get('user_pw')

        user = authenticate(request, user_id=user_id, user_pw=user_pw)

        if user:
            return Response({'detail': '로그인 성공'}, status=status.HTTP_200_OK)
        else:
            return Response({'detail': '아이디 또는 비밀번호가 올바르지 않습니다.'}, status=status.HTTP_401_UNAUTHORIZED)