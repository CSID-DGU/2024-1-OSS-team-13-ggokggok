from django.db import models

# Create your models here.
from django.db import models

class UserInfo(models.Model):
    user_id = models.CharField(max_length=15, unique=True)
    user_pw = models.CharField(max_length=15)
    user_mail = models.EmailField()
    user_name = models.CharField(max_length=15)
    user_region1 = models.CharField(max_length=100, null=True, blank=True)
    user_region2 = models.CharField(max_length=100, null=True, blank=True)

    def __str__(self):
        return self.user_id
