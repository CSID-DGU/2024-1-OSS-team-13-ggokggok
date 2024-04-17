
from .models import PlaceInfo
def update_review(place_id):
    from place.models import PlacePost  # 함수 내에서 import
    posts = PlacePost.objects.filter(place_id=place_id)
    total = sum([post.review for post in posts])  # 'review' 오타 수정
    average = total / len(posts) if len(posts) > 0 else 0
    place_info = PlaceInfo.objects.get(id=place_id)
    place_info.review = average
    place_info.save()


