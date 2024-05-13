from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema
from community.models import Post
from community.serializers import CommunityPostSerializer, CommunityPostVoteSerializer
from rest_framework.permissions import IsAuthenticated

def extract_region(full_region):
    # 문자열을 공백 기준으로 분할합니다. 최대 2개의 띄어쓰기만 고려하여 분할
    word = full_region.split(' ', 2)
    # 띄어쓰기로 분할된 부분 중 첫 2개만 합침
    # 띄어쓰기가 2번 이하인 경우에는 전체 문자열이나, 해당하는 부분만 반환
    extracted_region = ' '.join(word[:2])
    return extracted_region
class PostListAndCreate(APIView):
    #permission_classes = [IsAuthenticated]
    serializer_class = CommunityPostSerializer
    queryset = Post.objects.all()
    #authentication_classes = [TokenAuthentication]
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
        serializer = CommunityPostSerializer(data=request.data)
        if serializer.is_valid():
            requested_region = request.data.get('post_region', '')
            requested_region = extract_region(requested_region)
            temp1 = False
            temp2 = False
            if request.user.region1 is not None or request.user.region2 is not None:
                # request한 사용자의 region1과 region2 값을 얻습니다.
                if request.user.region1 is not None:
                    user_region1 = extract_region(request.user.region1)
                    if user_region1 == requested_region:
                        temp1 = True
                if request.user.region2 is not None:
                    user_region2 = extract_region(request.user.region2)
                    if user_region2 == requested_region:
                        temp2 = True
                # 요청된 region 값이 사용자의 region1 또는 region2와 일치하는지 확인합니다.
                if temp1 or temp2:
                    serializer.save(author=request.user)
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
                        'status code': status.HTTP_403_FORBIDDEN,
                        'message': '사용자가 등록한 지역의 게시글만 작성 가능합니다',
                        'data': serializer.data
                    }
                    return Response(response_data, status=status.HTTP_403_FORBIDDEN)
            else:
                response_data = {
                    'success': False,
                    'status code': status.HTTP_403_FORBIDDEN,
                    'message': '사용자의 지역 정보가 설정되지 않았습니다.',
                    'data': serializer.data
                }
            return Response(response_data, status=status.HTTP_403_FORBIDDEN)
        response_data = {
            'success': False,
            'status code': status.HTTP_400_BAD_REQUEST,
            'message': '요청 실패.',
            'data': serializer.data
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


    @swagger_auto_schema(tags=['커뮤니티 게시글 CRUD'])
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

class PostVote(APIView):
    permission_classes = [IsAuthenticated]
    queryset = Post.objects.all()
    serializer_class = CommunityPostVoteSerializer
    @swagger_auto_schema(request_body=CommunityPostVoteSerializer, tags=['추천 API'])
    def post(self, request, post_id, *args, **kwargs):
        post = get_object_or_404(Post, pk=post_id)
        serializer = CommunityPostVoteSerializer(data=request.data)
        if not serializer.is_valid():
            response_data = {
                'success': False,
                'status code': status.HTTP_400_BAD_REQUEST,
                'message': '요청 실패.',
            }
            return Response(response_data, status=status.HTTP_400_BAD_REQUEST)
        if request.user == post.author:
            response_data = {
                'success': False,
                'status code': status.HTTP_403_FORBIDDEN,
                'message': '본인이 작성한 게시글은 추천할 수 없습니다.',
                'data': serializer.data
            }
            return Response(response_data, status=status.HTTP_403_FORBIDDEN)
        elif request.user in post.voter.all():
            # 이미 추천한 경우 추천 취소
            post.voter.remove(request.user)
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
            post.voter.add(request.user)
            post.save()  # 변경 사항 저장
            serializer = CommunityPostVoteSerializer(post)
            response_data = {
                'success': True,
                'status code': status.HTTP_200_OK,
                'message': '추천!.',
                'data': serializer.data
            }
            return Response(response_data, status=status.HTTP_200_OK)
