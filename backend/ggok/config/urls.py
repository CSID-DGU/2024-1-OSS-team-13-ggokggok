from django.contrib import admin
from django.urls import path, include
import community.serializers
from community.serializers import PostViewSet, CommentViewSet
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import routers
from rest_framework.permissions import AllowAny
from community.views.base_views import index

app_name='community'

# QuestionViewSet에 대한 URL
post_router = routers.DefaultRouter()
post_router.register('community/post', PostViewSet, basename='post')

# AnswerViewSet에 대한 URL 설정
comment_router = routers.DefaultRouter()
comment_router.register('community/comment', CommentViewSet, basename='comment')  # URL 경로 변경

schema_view = get_schema_view(
    openapi.Info(
        title="Rest API Document",
        default_version='v1',
        description="API documentation",
    ),
    public=True,
    permission_classes=(AllowAny,),
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(post_router.urls)),
    path('api/', include(comment_router.urls)),  # community/answer/에 대한 URL 변경
    path('api/doc/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('', index, name='index'),
]
