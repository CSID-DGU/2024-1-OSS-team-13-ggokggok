from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from place.models import PlacePost
from django.db.models import Q
from rest_framework.decorators import api_view
from rest_framework.response import Response
from place.serializers import PlacePostSerializer


@swagger_auto_schema(method='get', query_serializer=PlacePostSerializer(), tags=['명소 게시글 검색'])
@api_view(['GET'])
def RegionSearch(request):
    address = request.GET.get('address', '')
    search = request.GET.get('search', '')
    post_list = PlacePost.objects.order_by('-review')  # 추천수가 많은 순으로 정렬

    if address:
        post_list = post_list.filter(
                Q(address__icontains=address)
        ).distinct()

    elif search:
        post_list = post_list.filter(
            Q(subject__icontains=search) |
            Q(content__icontains=search) |
            Q(address__icontains=search)
        ).distinct()
    serializer = PlacePostSerializer(post_list, many=True)
    response_data = {
        'success': True,
        'status code': status.HTTP_200_OK,
        'message': "요청에 성공하였습니다.",
        'data': serializer.data
    }
    return Response(response_data, status=status.HTTP_200_OK)