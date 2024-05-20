from django.contrib.auth import authenticate, login, logout
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from user.models import UserInfo
from user.serializers import JoinSerializer,LoginSerializer
from drf_yasg.utils import swagger_auto_schema

class LoginView(APIView):
    #permission_classes = [IsAuthenticated]
    serializer_class = LoginSerializer
    queryset = UserInfo.objects.all()
    @swagger_auto_schema(request_body=LoginSerializer, tags=['유저 관리'])
    def post(self, request, *args, **kwargs):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            username = request.data['username']
            password = request.data['password']
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                user_info = UserInfo.objects.get(username=username)
                user_data = {
                    'id': user_info.id,
                    'username': user_info.username,
                    'region1': user_info.region1,
                    'region2': user_info.region2,
                }
                response_data = {
                    'success': True,
                    'status code': status.HTTP_200_OK,
                    'message': "로그인 성공.",
                    'data': user_data
                }
                return Response(response_data, status=status.HTTP_200_OK)
            else:
                response_data = {
                    'success': False,
                    'status code': status.HTTP_404_NOT_FOUND,
                    'message': "등록되지 않은 사용자입니다.",
                    'data': serializer.data
                }
                return Response(response_data, status=status.HTTP_404_NOT_FOUND)
        else:
            response_data = {
                'success': False,
                'status code': status.HTTP_400_BAD_REQUEST,
                'message': "요청 실패.",
                'data': serializer.data
            }
            return Response(response_data, status=status.HTTP_400_BAD_REQUEST)


class LogoutView(APIView):
    serializer_class = LoginSerializer
    queryset = UserInfo.objects.all()
    @swagger_auto_schema(tags=['유저 관리'])
    def post(self, request):
        if request.user.is_authenticated:  # 사용자가 로그인되어있는지
            logout(request)
            response_data = {
                'success': True,
                'status code': status.HTTP_200_OK,
                'message': "로그아웃 되었습니다.",
            }
            return Response(response_data, status=status.HTTP_200_OK)
        else:
            response_data = {
                'success': False,
                'status code': status.HTTP_400_BAD_REQUEST,
                'message': "로그인되어 있지 않습니다.",
            }
            return Response(response_data, status=status.HTTP_400_BAD_REQUEST)


class JoinView(APIView):
    #permission_classes = [IsAuthenticated]
    serializer_class = JoinSerializer
    queryset = UserInfo.objects.all()
    @swagger_auto_schema(request_body=JoinSerializer, tags=['유저 관리'])
    def post(self, request, *args, **kwargs):
        serializer = JoinSerializer(data=request.data)
        if serializer.is_valid():
            new_username = serializer.validated_data['username']
            new_password = serializer.validated_data['password']
            if UserInfo.objects.filter(username=new_username).exists():
                response_data = {
                    'success': False,
                    'status code': status.HTTP_400_BAD_REQUEST,
                    'message': "이미 사용중인 아이디입니다.",
                    'data': serializer.data
                }
                return Response(response_data, status=status.HTTP_400_BAD_REQUEST)
            else:
                UserInfo.objects.create_user(username=new_username, password=new_password)
                response_data = {
                    'success': True,
                    'status code': status.HTTP_200_OK,
                    'message': "회원가입 되었습니다.",
                    'data': serializer.data
                }
                return Response(response_data,status = status.HTTP_201_CREATED)
        response_data = {
            'success': False,
            'status code': status.HTTP_400_BAD_REQUEST,
            'message': "요청 실패.",
            'data': serializer.data
        }
        return Response(response_data, status=status.HTTP_400_BAD_REQUEST)