from django import forms
from models import PlacePost, PlaceComment


class PlacePostForm(forms.ModelForm):
    class Meta:
        model = PlacePost  # 사용할 모델
        fields = ['title', 'content']  # QuestionForm에서 사용할 Question 모델의 속성
class PlaceCommentForm(forms.ModelForm):
    class Meta:
        model = PlaceComment
        fields = ['content']
