from django.urls import path
from community.views.post_views import PostListAndCreate, PostDetailUpdateDelete, PostVote
from community.views.comment_views import CommentListAndCreate,CommentDetail,CommentVote
app_name = 'community'

urlpatterns = [
    #post url
    path('post/', PostListAndCreate.as_view(), name='post_list_create'),
    path('post/<int:post_id>/', PostDetailUpdateDelete.as_view(), name='post_detail_update_delete'),
    path('post/vote/<int:post_id>/', PostVote.as_view(), name='post_vote'),
    #comment url
    path('post/comments/<int:post_id>/', CommentListAndCreate.as_view(), name='comment_list_and_create'),
    path('comment/<int:comment_id>/', CommentDetail.as_view(), name='comment_detail'),
    path('comment/vote/<int:comment_id>/', CommentVote.as_view(), name='comment_vote'),
]
