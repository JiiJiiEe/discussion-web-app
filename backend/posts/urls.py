from django.urls import path
from .views import PostListCreate, ThreadListCreate, ThreadDetail, PostDetail
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer

class RegisterUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

urlpatterns = [
    path('threads/', ThreadListCreate.as_view(), name='thread-list-create'),
    path('threads/<int:pk>/', ThreadDetail.as_view(), name='thread-detail'),

    path('threads/<int:thread_id>/posts/', PostListCreate.as_view(), name='post-list-create'),
    path('posts/<int:pk>/', PostDetail.as_view(), name='post-detail'),

    path('auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/register/', RegisterUserView.as_view(), name='register_user'),
]