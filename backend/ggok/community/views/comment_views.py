from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from community.forms import CommentForm
from community.models import Post, Comment
from community.api import CommentSerializer, PostSerializer
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.utils import timezone

@login_required(login_url='account:login')
@api_view(['POST'])
def comment_create(request, post_id):
    post = get_object_or_404(Post, pk=post_id)
    if request.method == 'POST':
        form = Comment(request.data)
        if form.is_valid():
            comment = form.save(commit=False)
            comment.author = request.user
            comment.create_date = timezone.now()
            comment.post = post
            comment.save()
            serializer = CommentSerializer(comment)
            return Response(serializer.data)
        return Response(form.errors, status=400)

@login_required(login_url='account:login')
@api_view(['PUT'])
def comment_modify(request, commnet_id):
    comment = get_object_or_404(Comment, pk=commnet_id)
    if request.user != comment.author:
        return Response({'error': '수정권한이 없습니다'}, status=403)
    if request.method == 'PUT':
        form = CommentForm(request.data, instance=comment)
        if form.is_valid():
            comment = form.save(commit=False)
            comment.modify_date = timezone.now()
            comment.save()
            serializer = CommentSerializer(comment)
            return Response(serializer.data)
        return Response(form.errors, status=400)

@login_required(login_url='account:login')
@api_view(['DELETE'])
def comment_delete(request, comment_id):
    comment = get_object_or_404(Comment, pk=comment_id)
    if request.user != comment.author:
        return Response({'error': '삭제권한이 없습니다'}, status=403)
    comment.delete()
    return Response(status=204)

@login_required(login_url='account:login')
@api_view(['POST'])
def comment_vote(request, comment_id):
    comment = get_object_or_404(Comment, pk=comment_id)
    if request.user == comment.author:
        return Response({'error': '본인이 작성한 글은 추천할수 없습니다'}, status=400)
    else:
        comment.voter.add(request.user)
        serializer = CommentSerializer(comment)
        return Response(serializer.data)
