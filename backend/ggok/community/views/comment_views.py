from drf_yasg.utils import swagger_auto_schema
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from community.models import Post, Comment
from community.serializers import CommunityCommentSerializer
from community.forms import CommentForm
from django.utils import timezone

# 댓글 생성과 댓글 리스트 조회 파라미터에 post_id가 들어간다.
class CommentListAndCreate(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CommunityCommentSerializer
    queryset = Comment.objects.all()
    def get(self, request, post_id):
        post = get_object_or_404(Post, pk=post_id)
        comments = post.comment_set.all()
        serializer = CommunityCommentSerializer(comments, many=True)
        return Response(serializer.data)
    @swagger_auto_schema(request_body=CommunityCommentSerializer)
    def post(self, request, post_id):
        post = get_object_or_404(Post, pk=post_id)
        form = CommentForm(request.data)
        if form.is_valid():
            comment = form.save(commit=False)
            comment.author = request.user
            comment.create_date = timezone.now()
            comment.post = post
            comment.save()
            serializer = CommunityCommentSerializer(comment)
            return Response(serializer.data)
        return Response(form.errors, status=400)

# 댓글의 조회(GET), 수정(PUT), 삭제(DELETE)
class CommentDetail(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CommunityCommentSerializer
    queryset = Comment.objects.all()
    def get(self, request, comment_id):
        comment = get_object_or_404(Comment, pk=comment_id)
        serializer = CommunityCommentSerializer(comment)
        return Response(serializer.data)
    @swagger_auto_schema(request_body=CommunityCommentSerializer)
    def put(self, request, comment_id):
        comment = get_object_or_404(Comment, pk=comment_id)
        form = CommentForm(request.data, instance=comment)
        if form.is_valid():
            if request.user != comment.author:
                return Response({'error': '수정권한이 없습니다'}, status=403)
            else:
                comment = form.save(commit=False)
                comment.modify_date = timezone.now()
                comment.save()
                serializer = CommunityCommentSerializer(comment)
                return Response(serializer.data)
        return Response(form.errors, status=400)

    def delete(self, request, comment_id):
        comment = get_object_or_404(Comment, pk=comment_id)
        if request.user != comment.author:
            comment.delete()
            return Response(status=204)
        else:
            return Response({'error': '삭제권한이 없습니다'}, status=403)


# 댓글 추천 기능
class CommentVote(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CommunityCommentSerializer
    queryset = Comment.objects.all()
    def post(self, request, comment_id):
        comment = get_object_or_404(Comment, pk=comment_id)
        if request.user == comment.author:
            return Response({'error': '본인이 작성한 댓글은 추천할 수 없습니다'}, status=400)
        else:
            comment.voter.add(request.user)
            serializer = CommunityCommentSerializer(comment)
            return Response(serializer.data)
