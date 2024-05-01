from django.shortcuts import render, get_object_or_404
from .post_views import PlacePost
from django.core.paginator import Paginator
from django.db.models import Q
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from ..serializers import PlacePostSerializer

@api_view(['GET'])
def index(request): #목록조회
    kw = request.GET.get('kw', '')  # 검색어
    placepost_list = PlacePost.objects.order_by('-date')
    if kw:
        placepost_list = placepost_list.filter(
            Q(title__icontains=kw) |  # 제목 검색
            Q(content__icontains=kw) |  # 내용 검색
            Q(placecomment__content__icontains=kw) |  # 답변 내용 검색
            Q(author__username__icontains=kw) |  # 질문 글쓴이 검색
            Q(placecomment__author__username__icontains=kw)  # 답변 글쓴이 검색
        ).distinct()
    serializer = PlacePostSerializer(placepost_list, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def detail(request, post_id): #게시글 개별 조회
    post = get_object_or_404(PlacePost, pk=post_id)
    serializer = PlacePostSerializer(post)
    return Response(serializer.data)
