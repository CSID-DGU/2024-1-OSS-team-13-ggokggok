from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from community.models import Post, Comment
from community.serializers import CommunityCommentSerializer, CommentPutSerializer, CommunityCommentVoteSerializer
from user.models import UserInfo


class CommentListAndCreate(APIView):
    #permission_classes = [IsAuthenticated]
    serializer_class = CommunityCommentSerializer
    queryset = Comment.objects.all()
    @swagger_auto_schema(tags=['커뮤니티 게시글의 댓글 List'])
    def get(self, request, post_id):
        post = get_object_or_404(Post, pk=post_id)
        comments = post.comment_set.all()
        serializer = CommunityCommentSerializer(comments, many=True)
        response_data = {
            'success': True,
            'status code': status.HTTP_200_OK,
            'message': "요청에 성공하였습니다.",
            'data': serializer.data
        }
        return Response(response_data, status=status.HTTP_200_OK)
    @swagger_auto_schema(request_body=CommunityCommentSerializer,tags=['커뮤니티 댓글 CRUD'])
    def post(self, request, post_id):
        # post = get_object_or_404(Post, pk=post_id)
        serializer = CommunityCommentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            response_data = {
                'success': True,
                'status code': status.HTTP_200_OK,
                'message': "댓글을 작성했습니다.",
                'data': serializer.data
            }
            return Response(response_data, status=status.HTTP_200_OK)
        response_data = {
            'success': False,
            'status code': status.HTTP_400_BAD_REQUEST,
            'message': "요청에 실패하였습니다.",
            'data': serializer.data
        }
        return Response(response_data, status=status.HTTP_400_BAD_REQUEST)

# 댓글의 조회(GET), 수정(PUT), 삭제(DELETE)
class CommentDetail(APIView):
    #permission_classes = [IsAuthenticated]
    serializer_class = CommunityCommentSerializer
    queryset = Comment.objects.all()
    def get_object(self, comment_id):
        return get_object_or_404(Comment, pk=comment_id)
    @swagger_auto_schema(tags=['커뮤니티 댓글 CRUD'])
    def get(self, request, comment_id, *args, **kwargs):
        comment = self.get_object(comment_id)
        serializer = CommunityCommentSerializer(comment)
        response_data = {
            'success': True,
            'status code': status.HTTP_200_OK,
            'message': '요청 성공.',
            'data': serializer.data
        }
        return Response(response_data, status=status.HTTP_200_OK)
    @swagger_auto_schema(request_body=CommentPutSerializer, tags=['커뮤니티 댓글 CRUD'])
    def put(self, request, comment_id):
        comment = self.get_object(comment_id)
        serializer = CommentPutSerializer(comment, data=request.data)
        requested_author = request.data.get('author')
        if serializer.is_valid():
            if requested_author == comment.author:
                serializer.save()
                response_data = {
                    'success': True,
                    'status code': status.HTTP_200_OK,
                    'message': '댓글을 수정했습니다.',
                    'data': serializer.data
                }
                return Response(response_data, status=status.HTTP_200_OK)
            else:
                response_data = {
                    'success': False,
                    'status code': status.HTTP_403_FORBIDDEN,
                    'message': "댓글 수정 권한이 없습니다.",
                    'data': serializer.data
                }
                return Response(response_data, status=status.HTTP_403_FORBIDDEN)
        else:
            response_data = {
                'success': False,
                'status code': status.HTTP_400_BAD_REQUEST,
                'message': '요청 실패.',
                'data': serializer.data
            }
        return Response(response_data, status=status.HTTP_400_BAD_REQUEST)
    @swagger_auto_schema(tags=['커뮤니티 댓글 CRUD'])
    def delete(self, request, comment_id):
        comment = self.get_object(comment_id)
        requested_author = request.data.get('author')
        if requested_author == comment.author:
            comment.delete()
            response_data = {
                'success': True,
                'status code': status.HTTP_200_OK,
                'message': '게시글을 삭제했습니다.',
            }
            return Response(response_data, status=status.HTTP_200_OK)
        elif requested_author != comment.author:
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

# 댓글 추천 기능
class CommentVote(APIView):
    #permission_classes = [IsAuthenticated]
    serializer_class = CommunityCommentVoteSerializer
    queryset = Comment.objects.all()
    @swagger_auto_schema(request_body=CommunityCommentVoteSerializer, tags=['추천 API'])
    def post(self, request, comment_id):
        comment = get_object_or_404(Comment, pk=comment_id)
        serializer = CommunityCommentSerializer(comment, data=request.data)
        requested_author_id = request.data.get('author')
        if serializer.is_valid():
            # requested_author_id로 User 객체를 조회합니다.
            requested_author = get_object_or_404(UserInfo, pk=requested_author_id)

            if requested_author == comment.author:
                response_data = {
                    'success': False,
                    'status code': status.HTTP_400_BAD_REQUEST,
                    'message': '본인이 작성한 게시글은 추천할 수 없습니다.',
                    'data': serializer.data
                }
                return Response(response_data, status=status.HTTP_400_BAD_REQUEST)

            if requested_author in comment.voter.all():
                # 이미 추천한 경우 추천 취소
                comment.voter.remove(requested_author)
                comment.save()  # 변경 사항 저장
                serializer = CommunityCommentVoteSerializer(comment)
                response_data = {
                    'success': True,
                    'status code': status.HTTP_200_OK,
                    'message': '추천을 취소했습니다.',
                    'data': serializer.data
                }
                return Response(response_data, status=status.HTTP_200_OK)
            else:
                comment.voter.add(requested_author)
                serializer = CommunityCommentVoteSerializer(comment)
                comment.save()  # 변경 사항 저장
                response_data = {
                    'success': True,
                    'status code': status.HTTP_200_OK,
                    'message': '추천!.',
                    'data': serializer.data
                }
                return Response(response_data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)