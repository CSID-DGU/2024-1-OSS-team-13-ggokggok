from django.db import models
from user.models import UserInfo


class Post(models.Model):
    author = models.CharField(max_length=200)
        #models.ForeignKey(UserInfo, on_delete=models.CASCADE, related_name='post_author')) # 계정이 삭제되면 이 계정이 작성한 질문을 삭제하도록
    subject = models.CharField(max_length=200)
    content = models.TextField()
    create_date = models.DateTimeField(auto_now_add=True,blank=True)
    post_region = models.CharField(max_length=30)
    modify_date = models.DateTimeField(null=True, blank=True)
    voter = models.ManyToManyField(UserInfo, blank=True, default=0, related_name='post_voter')  # 추천인 추가
    objects = models.Manager()
    #사진 추가
    image = models.ImageField(blank=True, null=True, upload_to='community/') #사진 경로는 media/community/파일명
    def __str__(self):
        return self.subject


class Comment(models.Model):
    author = models.ForeignKey(UserInfo, on_delete=models.CASCADE, related_name='answer_author')
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    content = models.TextField()
    create_date = models.DateTimeField(auto_now_add=True,blank=True)
    modify_date = models.DateTimeField(null=True, blank=True)
    voter = models.ManyToManyField(UserInfo, blank=True, default=0, related_name='answer_voter')
    objects = models.Manager()
    def __str__(self):
        return f"Answer to {self.post.subject} by {self.author.username}"
    #장고 관리자에서 보기 편하도록 만들어둔 것