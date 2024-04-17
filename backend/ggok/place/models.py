from django.db import models

from placesinfo.views import update_review
from user.models import UserInfo

class PlacePost(models.Model):
    id = models.AutoField(primary_key=True)
    author = models.ForeignKey(UserInfo, on_delete=models.CASCADE, related_name='author_placepost') # 계정이 삭제되면 이 계정이 작성한 질문을 삭제하도록
    title = models.CharField(max_length=200)
    content = models.TextField()
    date = models.DateTimeField(auto_now_add=True)
    lat = models.FloatField()
    long = models.FloatField()
    address = models.TextField(null=True)  # 주소_텍스트
    name = models.CharField(max_length=200, null=True)  # 상호명
    place_id = models.CharField(max_length=30)
    #modify_date = models.DateTimeField(null=True, blank=True) 수정 일시는 일단 기능 추가 안함.
    #voter = models.ManyToManyField(UserInfo, blank=True ,related_name='recommended_placepost')  # 추천인 추가
    public = models.BooleanField()
    review = models.IntegerField()
    category = models.CharField(max_length=50)
    objects = models.Manager()
    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        super(PlacePost, self).save(*args, **kwargs)
        update_review(self.place_id) #별점 업데이트

class PlaceComment(models.Model):
    id = models.AutoField(primary_key=True)
    author = models.ForeignKey(UserInfo, on_delete=models.CASCADE, related_name='author_placecomment')
    placepost = models.ForeignKey(PlacePost, on_delete=models.CASCADE)
    content = models.TextField()
    recommended = models.ManyToManyField(UserInfo, related_name='recommended_placecomment')
    date = models.DateTimeField(auto_now_add=True)
    objects = models.Manager()
    def __str__(self):
        return f"Answer to {self.post.title} by {self.author.username}"

