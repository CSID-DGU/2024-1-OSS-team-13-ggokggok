from django.db import models

from placesinfo.models import PlaceInfo
from user.models import UserInfo

from django.db import models
from user.models import UserInfo


class PlacePost(models.Model):
    author = models.ForeignKey(UserInfo, on_delete=models.CASCADE, related_name='author_place_post')
    subject = models.CharField(max_length=200)
    content = models.TextField()
    create_date = models.DateTimeField(auto_now_add=True, blank=True)
    lat = models.DecimalField(max_digits=9, decimal_places=6)
    long = models.DecimalField(max_digits=9, decimal_places=6)
    address = models.TextField(null=True)
    name = models.CharField(max_length=200, null=True)
    modify_date = models.DateTimeField(null=True, blank=True)
    public = models.BooleanField(default=False)
    review = models.IntegerField()
    category = models.CharField(max_length=50)

    objects = models.Manager()
    def __str__(self):
        return self.subject

class PlaceComment(models.Model):
    author = models.ForeignKey(UserInfo, on_delete=models.CASCADE, related_name='place_comments')
    post = models.ForeignKey(PlacePost, on_delete=models.CASCADE)
    content = models.TextField()
    create_date = models.DateTimeField(auto_now_add=True, blank=True)
    modify_date = models.DateTimeField(null=True, blank=True)
    voter = models.ManyToManyField(UserInfo, blank=True, related_name='place_comment_votes')
    objects = models.Manager()

    def __str__(self):
        return f"Answer to {self.post.subject} by {self.author.username}"
