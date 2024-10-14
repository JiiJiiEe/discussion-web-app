from django.urls import path
from .views import PostListCreate, ThreadListCreate, ThreadDetail, PostDetail

urlpatterns = [
    path('threads/', ThreadListCreate.as_view(), name='thread-list-create'),
    path('threads/<int:pk>/', ThreadDetail.as_view(), name='thread-detail'),

    path('threads/<int:thread_id>/posts/', PostListCreate.as_view(), name='post-list-create'),
    path('posts/<int:pk>/', PostDetail.as_view(), name='post-detail'),
]