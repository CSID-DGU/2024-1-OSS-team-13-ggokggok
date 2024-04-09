from django import forms
from community.models import Post, Comment


class PostForm(forms.ModelForm):
    class Meta:
        model = Post  # 사용할 모델
        fields = ['subject', 'content']  # QuestionForm에서 사용할 Question 모델의 속성
class CommentForm(forms.ModelForm):
    class Meta:
        model = Comment
        fields = ['content']
