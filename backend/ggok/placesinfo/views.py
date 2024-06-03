from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from django.db.models import Q
from rest_framework.decorators import api_view
from rest_framework.response import Response
from placesinfo.models import PlaceInfo
from placesinfo.serializers import PlaceInfoSerializer


@swagger_auto_schema(method='get', query_serializer=PlaceInfoSerializer(), tags=['명소 게시글 검색'])
@api_view(['GET'])
def RegionSearch(request):
    address = request.GET.get('address', '')
    secret = request.GET.get('secret', '')

    if address:  # review_count 가 5 이상인 place_post 를 추천 수가 많은 순으로 정렬
        post_list = PlaceInfo.objects.filter(review_count__gte=5).order_by('-average_review')
        post_list = post_list.filter(
                Q(address__icontains=address)
        ).distinct()
        serializer = PlaceInfoSerializer(post_list, many=True)
        response_data = {
            'success': True,
            'status code': status.HTTP_200_OK,
            'message': "해당 지역의 명소 게시글 중 게시글의 수가 5 이상인 장소를 평점순으로 정렬합니다.",
            'data': serializer.data
        }
        return Response(response_data, status=status.HTTP_200_OK)

    elif secret:  # review_count 가 5 이하 이고, average_review 가 4.7 이상인 경우
        post_list = PlaceInfo.objects.filter(review_count__lt=5, average_review__gte=4.7).order_by('-average_review')
        post_list = post_list.filter(
            Q(address__icontains=secret)
        ).distinct()
        serializer = PlaceInfoSerializer(post_list, many=True)
        response_data = {
            'success': True,
            'status code': status.HTTP_200_OK,
            'message': "해당 지역의 숨은 명소를 평점순으로 정렬합니다.",
            'data': serializer.data
        }
        return Response(response_data, status=status.HTTP_200_OK)

    else:
        post_list = PlaceInfo.objects.filter(review_count__gte=5).order_by('-average_review')# 평균 리뷰값이 높은 순으로 정렬
        serializer = PlaceInfoSerializer(post_list, many=True)
        response_data = {
            'success': True,
            'status code': status.HTTP_200_OK,
            'message': "게시글이 5개 이상인 장소를 평점순으로 정렬합니다.",
            'data': serializer.data
        }
        return Response(response_data, status=status.HTTP_200_OK)