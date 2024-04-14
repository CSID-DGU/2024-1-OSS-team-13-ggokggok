
# Create your models here.
from django.db import models

class user_info(models.Model):
    id = models.AutoField(primary_key=True)  # 기본 키로 설정
    name = models.CharField(max_length=15)
    pw = models.CharField(max_length=15)
    email = models.EmailField()
    region1 = models.CharField(max_length=100, null=True, blank=True)
    region2 = models.CharField(max_length=100, null=True, blank=True)

    def __str__(self):
        return self.id

