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
        if UserInfo.objects.filter(author=author).none():
            response_data = {
                'success': False,
                'status code': status.HTTP_400_BAD_REQUEST,
                'message': "사용자가 존재하지 않습니다.",
                'data': {}
            }
            return Response(response_data, status=status.HTTP_400_BAD_REQUEST)

        if PlacePost.objects.filter(author=author, lat=lat, long=long).exists():
            response_data = {
                'success': False,
                'status code': status.HTTP_400_BAD_REQUEST,
                'message': "해당 위치에 대한 게시글은 이미 작성되었습니다.",
                'data': {}
            }
            return Response(response_data, status=status.HTTP_400_BAD_REQUEST)
        if serializer.is_valid():
            serializer.save(author=author)
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
            'data': serializer.errors
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
        if serializer.is_valid():
            if request.user == post.author:
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
        if request.user == post.author:
            post.delete()
            response_data = {
                'success': True,
                'status code': status.HTTP_200_OK,
                'message': '게시글을 삭제했습니다.',
            }
            return Response(response_data, status=status.HTTP_200_OK)
        elif request.user != post.author:
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


# class PostVote(APIView):
#     #permission_classes = [IsAuthenticated]
#     queryset = PlacePost.objects.all()
#     serializer_class = PlacePostSerializer
#     @swagger_auto_schema(request_body=PlacePostVoteSerializer, tags=['명소 추천 API'])
#     def post(self, request, post_id, *args, **kwargs):
#         post = get_object_or_404(PlacePost, pk=post_id)
#         serializer = PlacePostVoteSerializer(data=request.data)
#         if not serializer.is_valid():
#             response_data = {
#                 'success': False,
#                 'status code': status.HTTP_400_BAD_REQUEST,
#                 'message': '요청 실패.',
#             }
#             return Response(response_data, status=status.HTTP_400_BAD_REQUEST)
#         if request.user == post.author:
#             response_data = {
#                 'success': False,
#                 'status code': status.HTTP_403_FORBIDDEN,
#                 'message': '본인이 작성한 게시글은 추천할 수 없습니다.',
#                 'data': serializer.data
#             }
#             return Response(response_data, status=status.HTTP_403_FORBIDDEN)
#         elif request.user in post.voter.all():
#             # 이미 추천한 경우 추천 취소
#             post.voter.remove(request.user)
#             post.save()  # 변경 사항 저장
#             serializer = PlacePostVoteSerializer(post)
#             response_data = {
#                 'success': True,
#                 'status code': status.HTTP_200_OK,
#                 'message': '추천을 취소했습니다.',
#                 'data': serializer.data
#             }
#             return Response(response_data, status=status.HTTP_200_OK)
#         else:
#             post.voter.add(request.user)
#             post.save()  # 변경 사항 저장
#             serializer = PlacePostVoteSerializer(post)
#             response_data = {
#                 'success': True,
#                 'status code': status.HTTP_200_OK,
#                 'message': '추천!.',
#                 'data': serializer.data
#             }
#             return Response(response_data, status=status.HTTP_200_OK)

