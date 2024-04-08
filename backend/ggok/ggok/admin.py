from django.contrib import admin

# Register your models here.
from .models import Question
#localhost/admin 장고 관리자
#question model 등록.
class QuestionAdmin(admin.ModelAdmin):
    search_fields = ['subject']


admin.site.register(Question, QuestionAdmin)