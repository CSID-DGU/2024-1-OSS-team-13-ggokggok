from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from community.forms import PostForm
from community.models import Post
from community.serializers import PostSerializer
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.utils import timezone

@login_required(login_url='account:login')
@api_view(['POST'])
def post_create(request):
    if request.method == 'POST':
        form = PostForm(request.POST)
        if form.is_valid():
            post = form.save(commit=False)
            post.author = request.user
            post.create_date = timezone.now()
            post.save()
            serializer = PostSerializer(post)
            return Response(serializer.data)
        return Response(form.errors, status=400)

@login_required(login_url='account:login')
@api_view(['PUT'])
def post_modify(request, post_id):
    post = get_object_or_404(Post, pk=post_id)
    if request.user != post.author:
        return Response({'error': '수정권한이 없습니다'}, status=403)
    if request.method == 'PUT':
        form = PostForm(request.data, instance=post)
        if form.is_valid():
            post = form.save(commit=False)
            post.modify_date = timezone.now()
            post.save()
            serializer = PostSerializer(post)
            return Response(serializer.data)
        return Response(form.errors, status=400)

@login_required(login_url='account:login')
@api_view(['DELETE'])
def post_delete(request, post_id):
    post = get_object_or_404(Post, pk=post_id)
    if request.user != post.author:
        return Response({'error': '삭제권한이 없습니다'}, status=403)
    post.delete()
    return Response(status=204)

@login_required(login_url='account:login')
@api_view(['POST'])
def post_vote(request, post_id):
    post = get_object_or_404(Post, pk=post_id)
    if request.user == post.author:
        return Response({'error': '본인이 작성한 글은 추천할수 없습니다'}, status=400)
    else:
        post.voter.add(request.user)
        serializer = PostSerializer(post)
        return Response(serializer.data)
