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

        # 오늘 날짜의 시작 시간 계산 (시간을 모두 00:00:00으로 설정)
        today_start = now.replace(hour=0, minute=0, second=0, microsecond=0)

        # 오늘의 모든 게시글 필터링
        today_posts = PlacePost.objects.filter(create_date__gte=today_start)

        # 전체 이름과 주소 빈도 계산을 위한 Counter 초기화
        total_info_counts = Counter()

        # 각 게시글의 이름과 주소 빈도 계산
        for post in today_posts:
            # 이름과 주소 단어를 소문자로 변환하여 빈도 계산
            name = post.name.lower()
            address = post.address.lower()
            total_info_counts[(name, address)] += 1

        # 가장 많이 등장한 5개 이름과 주소 추출
        most_common_info = total_info_counts.most_common(5)

        # 결과 형식 변경 (튜플에서 딕셔너리로)
        result = [{'name': name, 'address': address, 'count': count} for (name, address), count in most_common_info]

        return Response(result, status=status.HTTP_200_OK)
