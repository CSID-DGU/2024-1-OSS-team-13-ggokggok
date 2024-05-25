from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from place.models import PlacePost
from place.serializers import PlacePostSerializer
from user.models import UserInfo


class PostListAndCreate(APIView):
    serializer_class = PlacePostSerializer
    queryset = PlacePost.objects.all()
    @swagger_auto_schema(tags=['명소 게시글 List'])
    def get(self, request, *args, **kwargs):
        posts = PlacePost.objects.all()
        serializer = PlacePostSerializer(posts, many=True)
        response_data = {
            'success': True,
            'status code': status.HTTP_200_OK,
            'message': "요청 성공.",
            'data': serializer.data
        }
        return Response(response_data, status=status.HTTP_200_OK)
    @swagger_auto_schema(request_body=PlacePostSerializer, tags=['명소 등록 CRUD'])
    def post(self, request):
        serializer = PlacePostSerializer(data=request.data)
        lat = request.data.get('lat')
        long = request.data.get('long')
        author = request.data.get('author')
        if UserInfo.objects.filter(id=author).none():
            response_data = {
                'success': False,
                'status code': status.HTTP_400_BAD_REQUEST,
                'message': "사용자가 존재하지 않습니다.",
                'data': {}
            }
            return Response(response_data, status=status.HTTP_400_BAD_REQUEST)

        if PlacePost.objects.filter(author_id=author, lat=lat, long=long).exists():
            response_data = {
                'success': False,
                'status code': status.HTTP_400_BAD_REQUEST,
                'message': "해당 위치에 대한 게시글은 이미 작성되었습니다.",
                'data': {}
            }
            return Response(response_data, status=status.HTTP_400_BAD_REQUEST)
        if serializer.is_valid():
            try:
                post_image = request.FILES.get('image')
                if post_image:
                    serializer.validated_data['image'] = post_image
            except Exception as e:
                print(f"An error occurred while uploading image: {e}")
                serializer.validated_data['image'] = None
            serializer.save()
            response_data = {
                'success': True,
                'status code': status.HTTP_201_CREATED,
                'message': "명소 포스트를 작성했습니다.",
                'data': serializer.data
            }
            return Response(response_data, status=status.HTTP_201_CREATED)
        response_data = {
            'success': False,
            'status code': status.HTTP_400_BAD_REQUEST,
            'message': "요청 실패.",
            'data': serializer.errors  # 에러 정보 포함
        }
        return Response(response_data, status=status.HTTP_400_BAD_REQUEST)


class PostDetailUpdateDelete(APIView):
    serializer_class = PlacePostSerializer
    queryset = PlacePost.objects.all()
    def get_object(self, post_id):
        return get_object_or_404(PlacePost, pk=post_id)
    @swagger_auto_schema(tags=['명소 등록 CRUD'])
    def get(self, request, post_id, *args, **kwargs):
        place = self.get_object(post_id)
        serializer = PlacePostSerializer(place)
        response_data = {
            'success': True,
            'status code': status.HTTP_200_OK,
            'message': '요청 성공.',
            'data': serializer.data
        }
        return Response(response_data, status=status.HTTP_200_OK)
    @swagger_auto_schema(request_body=PlacePostSerializer, tags=['명소 등록 CRUD'])
    def put(self, request, post_id, *args, **kwargs):
        post = self.get_object(post_id)
        serializer = PlacePostSerializer(post, data=request.data)
        requested_author = request.data.get('author')
        if serializer.is_valid():
            if requested_author == post.author:
                serializer.save()
                response_data = {
                    'success': True,
                    'status code': status.HTTP_200_OK,
                    'message': '게시글을 수정했습니다.',
                    'data': serializer.data
                }
                return Response(response_data, status=status.HTTP_200_OK)
            else:
                response_data = {
                    'success': False,
                    'status code': status.HTTP_400_BAD_REQUEST,
                    'message': '게시글 수정 권한이 없습니다.',
                    'data': serializer.data
                }
                return Response(response_data, status=status.HTTP_400_BAD_REQUEST)
        response_data = {
            'success': False,
            'status code': status.HTTP_400_BAD_REQUEST,
            'message': '요청 실패.',
            'data': serializer.data
        }
        return Response(response_data, status=status.HTTP_400_BAD_REQUEST)


    @swagger_auto_schema(tags=['명소 등록 CRUD'])
    def delete(self, request, post_id, *args, **kwargs):
        post = self.get_object(post_id)
        requested_author = request.data.get('author')
        if requested_author == post.author:
            post.delete()
            response_data = {
                'success': True,
                'status code': status.HTTP_200_OK,
                'message': '게시글을 삭제했습니다.',
            }
            return Response(response_data, status=status.HTTP_200_OK)
        elif requested_author != post.author:
            response_data = {
                'success': False,
                'status code': status.HTTP_403_FORBIDDEN,
                'message': '삭제 권한이 없습니다.',
            }
            return Response(response_data, status=status.HTTP_403_FORBIDDEN)
        else:
            response_data = {
                'success': False,
                'status code': status.HTTP_400_BAD_REQUEST,
                'message': '요청 실패.',
            }
            return Response(response_data, status=status.HTTP_400_BAD_REQUEST)

