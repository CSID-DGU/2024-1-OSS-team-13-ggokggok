from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema
from community.models import Post
from community.serializers import CommunityPostSerializer, CommunityPostVoteSerializer
from rest_framework import status, permissions
from rest_framework.authentication import SessionAuthentication
from user.models import UserInfo
from rest_framework.parsers import MultiPartParser, FormParser #이미지업로드
from drf_yasg import openapi


def extract_region(full_region):
    # 문자열을 공백 기준으로 분할합니다. 최대 2개의 띄어쓰기만 고려하여 분할
    word = full_region.split(' ', 2)
    # 띄어쓰기로 분할된 부분 중 첫 2개만 합침
    # 띄어쓰기가 2번 이하인 경우에는 전체 문자열이나, 해당하는 부분만 반환
    extracted_region = ' '.join(word[:2])
    return extracted_region
class PostListAndCreate(APIView):
    serializer_class = CommunityPostSerializer
    queryset = Post.objects.all()
    parser_classes = (MultiPartParser, FormParser)

    @swagger_auto_schema( tags=['커뮤니티 게시글 List'])
    def get(self, request, *args, **kwargs):
        posts = Post.objects.all()
        serializer = CommunityPostSerializer(posts, many=True)
        response_data = {
            'success': True,
            'status code': status.HTTP_200_OK,
            'message': "요청 성공.",
            'data': serializer.data
        }
        return Response(response_data, status=status.HTTP_200_OK)


    @swagger_auto_schema(request_body=CommunityPostSerializer, tags=['커뮤니티 게시글 CRUD'])
    def post(self, request, *args, **kwargs):
        requested_author = request.data.get('author')
        requested_region = request.data.get('post_region', '')

        try:
            user = UserInfo.objects.get(id=requested_author)
            user_region1 = user.region1
            user_region2 = user.region2
        except UserInfo.DoesNotExist:
            response_data = {
                'success': False,
                'status code': status.HTTP_400_BAD_REQUEST,
                'message': '사용자 정보를 찾을 수 없습니다.',
            }
            return Response(response_data, status=status.HTTP_400_BAD_REQUEST)

        temp1 = False
        temp2 = False

        if user_region1 is not None:
            user_region1 = extract_region(user_region1)
            if user_region1 == requested_region:
                temp1 = True

        if user_region2 is not None:
            user_region2 = extract_region(user_region2)
            if user_region2 == requested_region:
                temp2 = True

        if temp1 or temp2:
            serializer = CommunityPostSerializer(data=request.data)
            if serializer.is_valid():
                try:
                    post_image = request.FILES.get('image')
                    if post_image:
                        serializer.validated_data['image'] = post_image
                except Exception as e:
                    print(f"An error occurred while uploading image: {e}")
                    serializer.validated_data['image'] = None
                # if serializer.is_valid():
                serializer.save()
                response_data = {
                    'success': True,
                    'status code': status.HTTP_201_CREATED,
                    'message': "게시글 작성 성공.",
                    'data': serializer.data
                }
                return Response(response_data, status=status.HTTP_201_CREATED)
            else:
                response_data = {
                    'success': False,
                    'status code': status.HTTP_400_BAD_REQUEST,
                    'message': '입력한 데이터가 올바르지 않습니다.',
                    'data': serializer.errors
                }
                return Response(response_data, status=status.HTTP_400_BAD_REQUEST)
        else:
            response_data = {
                'success': False,
                'status code': status.HTTP_403_FORBIDDEN,
                'message': '사용자가 등록한 지역의 게시글만 작성 가능합니다',
            }
            return Response(response_data, status=status.HTTP_400_BAD_REQUEST)


class PostDetailUpdateDelete(APIView):
    #permission_classes = [IsAuthenticated]
    serializer_class = CommunityPostSerializer
    queryset = Post.objects.all()
    def get_object(self, post_id):
        return get_object_or_404(Post, pk=post_id)
    @swagger_auto_schema( tags=['커뮤니티 게시글 CRUD'])
    def get(self, request, post_id, *args, **kwargs):
        post = self.get_object(post_id)
        serializer = CommunityPostSerializer(post)
        response_data = {
            'success': True,
            'status code': status.HTTP_200_OK,
            'message': '요청 성공.',
            'data': serializer.data
        }
        return Response(response_data, status=status.HTTP_200_OK)



    @swagger_auto_schema(request_body=CommunityPostSerializer, tags=['커뮤니티 게시글 CRUD'])
    def put(self, request, post_id, *args, **kwargs):
        post = self.get_object(post_id)
        serializer = CommunityPostSerializer(post, data=request.data)
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


    @swagger_auto_schema(tags=['커뮤니티 게시글 CRUD'])
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

class PostVote(APIView):
    #permission_classes = [IsAuthenticated]
    queryset = Post.objects.all()
    serializer_class = CommunityPostVoteSerializer
    @swagger_auto_schema(request_body=CommunityPostVoteSerializer, tags=['추천 API'])
    def post(self, request, post_id):
        post = get_object_or_404(Post, pk=post_id)
        serializer = CommunityPostVoteSerializer(data=request.data)
        requested_author = request.data.get('author')
        if not serializer.is_valid():
            response_data = {
                'success': False,
                'status code': status.HTTP_400_BAD_REQUEST,
                'message': '요청 실패.',
            }
            return Response(response_data, status=status.HTTP_400_BAD_REQUEST)
        if requested_author == post.author:
            response_data = {
                'success': False,
                'status code': status.HTTP_403_FORBIDDEN,
                'message': '본인이 작성한 게시글은 추천할 수 없습니다.',
                'data': serializer.data
            }
            return Response(response_data, status=status.HTTP_403_FORBIDDEN)
        elif requested_author in post.voter.all():
            # 이미 추천한 경우 추천 취소
            post.voter.remove(requested_author)
            post.save()  # 변경 사항 저장
            serializer = CommunityPostVoteSerializer(post)
            response_data = {
                'success': True,
                'status code': status.HTTP_200_OK,
                'message': '추천을 취소했습니다.',
                'data': serializer.data
            }
            return Response(response_data, status=status.HTTP_200_OK)
        else:
            post.voter.add(requested_author)
            post.save()  # 변경 사항 저장
            serializer = CommunityPostVoteSerializer(post)
            response_data = {
                'success': True,
                'status code': status.HTTP_200_OK,
                'message': '추천!.',
                'data': serializer.data
            }
            return Response(response_data, status=status.HTTP_200_OK)
