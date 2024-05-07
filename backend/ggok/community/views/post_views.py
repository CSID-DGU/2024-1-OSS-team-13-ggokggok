from django.shortcuts import get_list_or_404, get_object_or_404
from django.utils import timezone
from community.forms import PostForm
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema
from community.models import Post
from community.serializers import PostSerializer
from django.contrib.auth.decorators import login_required
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes, api_view

@login_required(login_url='account:login')
@api_view(['GET', 'POST'])
def post_list_and_create(request):
    if request.method == 'GET':
        posts = get_list_or_404(Post)
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        form = PostForm(request.POST)
        if form.is_valid():
            post = form.save(commit=False)
            post.author = request.user
            post.create_date = timezone.now()
            post.save()
            serializer = PostSerializer(post)
            return Response(serializer.data, status=201)
        else:
            return Response(form.errors, status=400)


@login_required(login_url='account:login')
@api_view(['GET', 'PUT', 'DELETE'])
def post_handler(request, post_id):
    post = get_object_or_404(Post, pk=post_id)

    if request.method == 'GET':
        serializer = PostSerializer(post)
        return Response(serializer.data)
    elif request.method == 'PUT':
        if request.user != post.author:
            return Response({'error': '수정권한이 없습니다'}, status=403)
        form = PostForm(request.data, instance=post)
        if form.is_valid():
            post = form.save(commit=False)
            post.modify_date = timezone.now()
            post.save()
            serializer = PostSerializer(post)
            return Response(serializer.data)
        else:
            return Response(form.errors, status=400)
    elif request.method == 'DELETE':
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
class PostListAndCreate(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        posts = Post.objects.all()
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data)

    @swagger_auto_schema(request_body=PostSerializer)
    def post(self, request, *args, **kwargs):
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(author=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PostDetailUpdateDelete(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, post_id):
        return get_object_or_404(Post, pk=post_id)

    def get(self, request, post_id, *args, **kwargs):
        post = self.get_object(post_id)
        serializer = PostSerializer(post)
        return Response(serializer.data)

    @swagger_auto_schema(request_body=PostSerializer)
    def put(self, request, post_id, *args, **kwargs):
        post = self.get_object(post_id)
        serializer = PostSerializer(post, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, post_id, *args, **kwargs):
        post = self.get_object(post_id)
        post.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class PostVote(APIView):
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(responses={200: PostSerializer})
    def post(self, request, post_id, *args, **kwargs):
        post = get_object_or_404(Post, pk=post_id)
        if request.user == post.author:
            return Response({'error': '본인이 작성한 글은 추천할 수 없습니다.'}, status=400)
        else:
            post.voter.add(request.user)
            post.save()  # 변경 사항 저장
            serializer = PostSerializer(post)
            return Response(serializer.data)