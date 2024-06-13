# place/models.py 또는 해당 시그널이 정의된 파일
from django.db.models.signals import post_save
from django.dispatch import receiver
from place.models import PlacePost
from placesinfo.models import PlaceInfo

@receiver(post_save, sender=PlacePost)
def update_place_info(sender, instance, created, **kwargs):
    if created:
        if created:
            author = instance.author  # PlacePost 인스턴스의 author 필드를 통해 작성자(user) 정보 가져오기
            if instance.address in [author.region1, author.region2]:
                isPlace = PlaceInfo.objects.filter(lat=instance.lat, long=instance.long).first()

                if isPlace:
                    # PlaceInfo가 이미 존재하면, 리뷰 점수와 리뷰 수 업데이트
                    isPlace.total_review_score += instance.review
                    isPlace.review_count += 1
                    isPlace.update_average_review()
                else:
                    # PlaceInfo가 존재하지 않으면 생성
                    PlaceInfo.objects.create(
                        name=instance.name,
                        lat=instance.lat,
                        long=instance.long,
                        address=instance.address,
                        category=instance.category,
                        total_review_score=instance.review,
                        review_count=1,
                        average_review=instance.review,  # 첫 리뷰이므로 평균 = 리뷰 점수
                )
