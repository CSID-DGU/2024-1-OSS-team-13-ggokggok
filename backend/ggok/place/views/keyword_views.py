from collections import Counter
from datetime import timedelta
from django.utils import timezone
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from place.models import PlacePost

class PlaceFrequentWordsAPIView(APIView):
    def get(self, request):
        # 현재 시간 계산
        now = timezone.now()

        # 30분 전 시간 계산
        thirty_minutes_ago = now - timedelta(minutes=30)

        # 30분 이내에 생성된 게시글들 필터링
        recent_posts = PlacePost.objects.filter(create_date__gte=thirty_minutes_ago)

        # 30분 이내의 게시글이 5개 미만일 경우 1시간까지 고려.
        if recent_posts.count() < 5:
            one_hour_ago = now - timedelta(minutes=60)
            recent_posts = PlacePost.objects.filter(create_date__gte=one_hour_ago)

        # 전체 이름과 주소 빈도 계산을 위한 Counter 초기화
        total_info_counts = Counter()

        # 각 게시글의 이름과 주소 빈도 계산
        for post in recent_posts:
            # 이름과 주소 단어를 소문자로 변환하여 빈도 계산
            name = post.name.lower()
            address = post.address.lower()
            total_info_counts[(name, address)] += 1

        # 가장 많이 등장한 5개 이름과 주소 추출
        most_common_info = total_info_counts.most_common(5)

        # 결과 형식 변경 (튜플에서 딕셔너리로)
        result = [{'name': name, 'address': address, 'count': count} for (name, address), count in most_common_info]

        return Response(result, status=status.HTTP_200_OK)
