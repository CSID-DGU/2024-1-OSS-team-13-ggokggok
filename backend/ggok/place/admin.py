from django.contrib import admin
# Register your models here.
from .models import PlacePost, PlaceComment
#localhost/admin 장고 관리자
#question model 등록.
class PlacePostAdmin(admin.ModelAdmin):
    search_fields = ['title']
admin.site.register(PlacePost, PlacePostAdmin)
class PlaceCommentAdmin(admin.ModelAdmin):
    search_fields = ['content']
admin.site.register(PlaceComment, PlaceCommentAdmin)
