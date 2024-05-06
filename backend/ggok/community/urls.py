from django.urls import path
from community.views.post_views import PostListAndCreate, PostDetailUpdateDelete, PostVote
app_name = 'community'

urlpatterns = [
    path('post/', PostListAndCreate.as_view(), name='post_list_create'),
    path('post/<int:post_id>/', PostDetailUpdateDelete.as_view(), name='post_detail_update_delete'),
    path('post/vote/<int:post_id>/', PostVote.as_view(), name='post_vote'),
]
