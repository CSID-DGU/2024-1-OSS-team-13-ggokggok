from django.contrib import admin
# Register your models here.
from .models import Post, Comment
#localhost/admin 장고 관리자
#question model 등록.
class PostAdmin(admin.ModelAdmin):
    search_fields = ['subject']
admin.site.register(Post, PostAdmin)
class CommentAdmin(admin.ModelAdmin):
    search_fields = ['content']
admin.site.register(Comment, CommentAdmin)
