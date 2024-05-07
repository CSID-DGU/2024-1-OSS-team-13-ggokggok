from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from community.models import Post, Comment
from community.serializers import CommentSerializer
from community.forms import CommentForm
from django.utils import timezone

# 댓글 생성과 댓글 리스트 조회 파라미터에 post_id가 들어간다.
@method_decorator(login_required(login_url='account:login'), name='dispatch')
class CommentListAndCreate(APIView):
    def get(self, request, post_id):
        post = get_object_or_404(Post, pk=post_id)
        comments = post.comment_set.all()
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)

    def post(self, request, post_id):
        post = get_object_or_404(Post, pk=post_id)
        form = CommentForm(request.data)
        if form.is_valid():
            comment = form.save(commit=False)
            comment.author = request.user
            comment.create_date = timezone.now()
            comment.post = post
            comment.save()
            serializer = CommentSerializer(comment)
            return Response(serializer.data)
        return Response(form.errors, status=400)

# 댓글의 조회(GET), 수정(PUT), 삭제(DELETE)
@method_decorator(login_required(login_url='account:login'), name='dispatch')
class CommentDetail(APIView):
    def get(self, request, comment_id):
        comment = get_object_or_404(Comment, pk=comment_id)
        serializer = CommentSerializer(comment)
        return Response(serializer.data)

    def put(self, request, comment_id):
        comment = get_object_or_404(Comment, pk=comment_id)
        if request.user != comment.author:
            return Response({'error': '수정권한이 없습니다'}, status=403)
        form = CommentForm(request.data, instance=comment)
        if form.is_valid():
            comment = form.save(commit=False)
            comment.modify_date = timezone.now()
            comment.save()
            serializer = CommentSerializer(comment)
            return Response(serializer.data)
        return Response(form.errors, status=400)

    def delete(self, request, comment_id):
        comment = get_object_or_404(Comment, pk=comment_id)
        if request.user != comment.author:
            return Response({'error': '삭제권한이 없습니다'}, status=403)
        comment.delete()
        return Response(status=204)

# 댓글 추천 기능
@method_decorator(login_required(login_url='account:login'), name='dispatch')
class CommentVote(APIView):
    def post(self, request, comment_id):
        comment = get_object_or_404(Comment, pk=comment_id)
        if request.user == comment.author:
            return Response({'error': '본인이 작성한 댓글은 추천할 수 없습니다'}, status=400)
        else:
            comment.voter.add(request.user)
            serializer = CommentSerializer(comment)
            return Response(serializer.data)
