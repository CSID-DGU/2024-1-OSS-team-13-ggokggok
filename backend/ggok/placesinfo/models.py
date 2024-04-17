from django.db import models
from django.contrib.auth.models import User

class PlaceInfo(models.Model):
    id = models.AutoField(primary_key=True) #등록로직변경필요
    name = models.CharField(max_length=200) #상호명
    address = models.TextField() #주소_텍스트
    lat = models.FloatField()
    long = models.FloatField()
    review = models.IntegerField() #추천 판단용 지표값
    category = models.CharField(max_length=50)
    written = models.ManyToManyField(User, related_name='written_place')  # 글 쓴 사람수 ..사용처는 미정
