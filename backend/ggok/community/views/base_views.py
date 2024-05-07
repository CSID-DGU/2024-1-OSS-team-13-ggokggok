from .. models import Post
from django.db.models import Q
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from ..serializers import CommunityPostSerializer

@api_view(['GET'])
def index(request):
    kw = request.GET.get('kw', '')  # 검색어
    post_list = Post.objects.order_by('-create_date')
    if kw:
        post_list = post_list.filter(
            Q(subject__icontains=kw) |  # 제목 검색
            Q(content__icontains=kw) |  # 내용 검색
            Q(answer__content__icontains=kw) |  # 답변 내용 검색
            Q(author__username__icontains=kw) |  # 질문 글쓴이 검색
            Q(answer__author__username__icontains=kw)  # 답변 글쓴이 검색
        ).distinct()
    serializer = CommunityPostSerializer(post_list, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def detail(request, post_id):
    post = get_object_or_404(Post, pk=post_id)
    serializer = CommunityPostSerializer(post)
    return Response(serializer.data)
