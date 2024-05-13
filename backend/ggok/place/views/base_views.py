from drf_yasg.utils import swagger_auto_schema
from rest_framework import status

from place.models import PlacePost
from django.db.models import Q
from rest_framework.decorators import api_view
from rest_framework.response import Response
from place.serializers import PlacePostSerializer


@swagger_auto_schema(method='get', query_serializer=PlacePostSerializer(),tags=['명소 게시글 검색'])
@api_view(['GET'])
def RegionSearch(request):
    # 'region'과 'search' 파라미터를 가져옴
    region = request.GET.get('region', '')
    search = request.GET.get('search', '')
    name = request.GET.get('name', '')
    post_list = PlacePost.objects.order_by('voter') #추천수가 많은 순으로 정렬
    # 'region' 파라미터가 있을 경우 해당 로직을 실행
    if region:
        post_list = post_list.filter(
            Q(post_region__icontains=region)  # 지역 커뮤니티 게시글 검색
        ).distinct()

    # 'search' 파라미터가 있을 경우 해당 로직을 실행
    elif search:
        post_list = post_list.filter(
            Q(subject__icontains=search) |  # 제목, 내용, 지역을 포함해 검색
            Q(content__icontains=search) |
            Q(post_region__icontains=search)
        ).distinct()
    serializer = PlacePostSerializer(post_list, many=True)
    response_data = {
        'success': True,
        'status code': status.HTTP_200_OK,
        'message': "요청에 성공하였습니다.",
        'data': serializer.data
    }
    return Response(response_data, status=status.HTTP_200_OK)