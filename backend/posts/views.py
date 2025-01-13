from rest_framework import generics, permissions
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from .models import Thread, Post
from .serializers import ThreadSerializer, PostSerializer

class IsOwnerOrAdmin(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True

        # Allow admin users to delete anything
        if request.user.is_staff:
            return True
        # Only allow the owner of the object to delete it
        return obj.user == request.user

class ThreadListCreate(generics.ListCreateAPIView):
    queryset = Thread.objects.all().order_by('-created_at')
    serializer_class = ThreadSerializer
    permission_classes = [IsOwnerOrAdmin]

    def perform_create(self, serializer):
        # Assign the logged-in user as the thread creator
        serializer.save(user=self.request.user)

class ThreadDetail(generics.RetrieveDestroyAPIView):
    queryset = Thread.objects.all()
    serializer_class = ThreadSerializer
    permission_classes = [IsOwnerOrAdmin]

class PostListCreate(generics.ListCreateAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsOwnerOrAdmin]

    def get_queryset(self):
        return Post.objects.filter(thread_id=self.kwargs['thread_id'])

    def perform_create(self, serializer):
        thread = Thread.objects.get(id=self.kwargs['thread_id'])
        serializer.save(thread=thread, user=self.request.user)

class PostDetail(generics.RetrieveDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsOwnerOrAdmin]