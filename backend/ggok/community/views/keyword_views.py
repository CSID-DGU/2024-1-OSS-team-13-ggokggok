# views.py
from collections import Counter
from datetime import timedelta
from django.utils import timezone
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from community.models import Post
from community.excludeword import STOPWORDS_KO
import re
class FrequentWordsAPIView(APIView):

    def get(self, request):
        # 현재 시간 계산
        now = timezone.now()

        # 10분 전 시간 계산
        ten_minutes_ago = now - timedelta(minutes=10)

        # 10분 이내에 생성된 게시글들 필터링
        recent_posts = Post.objects.filter(create_date__gte=ten_minutes_ago)

        # 전체 단어 빈도 계산을 위한 Counter 초기화
        total_word_counts = Counter()

        # 각 게시글의 단어 빈도 계산
        for post in recent_posts:
            text_data = post.content + " " + post.subject
            words = re.findall(r'\w+', text_data.lower())
            filtered_words = [word for word in words if word not in STOPWORDS_KO]

            # 각 게시글에서 단어 빈도를 제한하여 계산
            post_word_counts = Counter(filtered_words)
            limited_post_word_counts = {word: min(count, 3) for word, count in post_word_counts.items()}

            # 전체 단어 빈도에 합산
            total_word_counts.update(limited_post_word_counts)

        # 가장 많이 등장한 5개 단어 추출
        most_common_words = total_word_counts.most_common(5)

        return Response(most_common_words, status=status.HTTP_200_OK)
