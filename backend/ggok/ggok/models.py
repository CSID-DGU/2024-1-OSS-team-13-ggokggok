from django.db import models
from django.contrib.auth.models import User


class Question(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='author_question') # 계정이 삭제되면 이 계정이 작성한 질문을 삭제하도록
    subject = models.CharField(max_length=200)
    content = models.TextField()
    create_date = models.DateTimeField()
    Question_region = models.CharField(max_length=30)
    #modify_date = models.DateTimeField(null=True, blank=True) 수정 일시는 일단 기능 추가 안함.
    voter = models.ManyToManyField(User, related_name='voter_question')  # 추천인 추가
    def __str__(self):
        return self.subject


class Answer(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='author_answer')
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    content = models.TextField()
    create_date = models.DateTimeField()
    #modify_date = models.DateTimeField(null=True, blank=True)
    voter = models.ManyToManyField(User, related_name='voter_answer')

    def __str__(self):
        return f"Answer to {self.question.subject} by {self.author.username}"
    #장고 관리자에서 보기 편하도록 만들어둔 것