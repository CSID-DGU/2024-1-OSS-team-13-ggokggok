from django.contrib.auth import authenticate, login, logout
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from user.models import UserInfo
from user.serializers import JoinSerializer,LoginSerializer, UserPostQuerySerializer, PostSerializer, PlacePostSerializer, MyUserInfoSerializer
from drf_yasg.utils import swagger_auto_schema
from community.models import Post
from place.models import PlacePost
from django.db.models import Q
from rest_framework.decorators import api_view
from django.shortcuts import get_object_or_404

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
        new_username = request.data.get('username')
        new_password = request.data.get('password')

        # 이미 사용중인 아이디인지 확인
        if UserInfo.objects.filter(username=new_username).exists():
            response_data = {
                'success': False,
                'status code': status.HTTP_400_BAD_REQUEST,
                'message': "이미 사용중인 아이디입니다.",
                'data': {}
            }
            return Response(response_data, status=status.HTTP_400_BAD_REQUEST)

        # 입력된 데이터가 유효한지 확인
        if serializer.is_valid():
            # 아이디가 존재하지 않는 경우에만 사용자 생성
            if not UserInfo.objects.filter(username=new_username).exists():
                UserInfo.objects.create_user(username=new_username, password=new_password)
                response_data = {
                    'success': True,
                    'status code': status.HTTP_201_CREATED,
                    'message': "회원가입 되었습니다.",
                    'data': serializer.data
                }
                return Response(response_data, status=status.HTTP_201_CREATED)
            else:
                response_data = {
                    'success': False,
                    'status code': status.HTTP_400_BAD_REQUEST,
                    'message': "이미 사용중인 아이디입니다.",
                    'data': {}
                }
                return Response(response_data, status=status.HTTP_400_BAD_REQUEST)
        else:
            response_data = {
                'success': False,
                'status code': status.HTTP_400_BAD_REQUEST,
                'message': "요청 실패.",
                'data': serializer.errors
            }
            return Response(response_data, status=status.HTTP_400_BAD_REQUEST)


@swagger_auto_schema(method='get', query_serializer=UserPostQuerySerializer, tags=['유저별 게시글 검색'])
@api_view(['GET'])
def UserPostSearch(request):
    query_serializer = UserPostQuerySerializer(data=request.query_params)
    if not query_serializer.is_valid():
        return Response(query_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    community = request.GET.get('community', '')
    place = request.GET.get('place', '')
    myuser = request.GET.get('myuser', '')
    post_list = Post.objects.order_by('create_date')
    place_post_list = PlacePost.objects.order_by('create_date')
    user_info_list = UserInfo.objects.all()

    if community:
        post_list = post_list.filter(
            #author=community
            Q(author__icontains=community)
        ).distinct()
        serializer = PostSerializer(post_list, many=True)
    elif place:
        place_post_list = place_post_list.filter(
            author_id=place
        ).distinct()
        serializer = PlacePostSerializer(place_post_list, many=True)
    elif myuser:
       user_info_list = user_info_list.filter(
            Q(id__icontains=myuser)
       ).distinct()
       serializer = MyUserInfoSerializer(user_info_list, many=True)
    else:
        return Response({"error": "Either 'community' or 'place' parameter must be provided."}, status=status.HTTP_400_BAD_REQUEST)

    response_data = {
        'success': True,
        'status code': status.HTTP_200_OK,
        'message': "요청에 성공하였습니다.",
        'data': serializer.data
    }
    return Response(response_data, status=status.HTTP_200_OK)

@swagger_auto_schema(method='put', request_body=MyUserInfoSerializer, tags=['유저 관리'])
@api_view(['PUT'])
def putRegion(request, id):
    user_info = get_object_or_404(UserInfo, id=id)
    serializer = MyUserInfoSerializer(user_info, data=request.data, partial=True)  # 부분 업데이트를 허용하기 위해 partial=True 사용

    if serializer.is_valid():
        serializer.save()
        response_data = {
            'success': True,
            'status code': status.HTTP_200_OK,
            'message': '지역 정보가 성공적으로 업데이트되었습니다.',
            'data': serializer.data
        }
        return Response(response_data, status=status.HTTP_200_OK)
    else:
        response_data = {
            'success': False,
            'status code': status.HTTP_400_BAD_REQUEST,
            'message': '유효하지 않은 데이터입니다.',
            'data': serializer.errors
        }
        return Response(response_data, status=status.HTTP_400_BAD_REQUEST)
