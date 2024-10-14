#from django.shortcuts import render
from rest_framework import generics
from .models import Post, Thread
from .serializers import PostSerializer, ThreadSerializer

# View to list all threads and create a new thread
class ThreadListCreate(generics.ListCreateAPIView):
    queryset = Thread.objects.all().order_by('-created_at')
    serializer_class = ThreadSerializer

class ThreadDetail(generics.RetrieveDestroyAPIView):
    queryset = Thread.objects.all()
    serializer_class = ThreadSerializer

# View to list and create posts in a specific thread
class PostListCreate(generics.ListCreateAPIView):
    serializer_class = PostSerializer

    def get_queryset(self):
        thread_id = self.kwargs['thread_id']
        return Post.objects.filter(thread__id=thread_id)

    def perform_create(self, serializer):
        thread_id = self.kwargs['thread_id']
        thread = Thread.objects.get(id=thread_id)
        serializer.save(thread=thread)

class PostDetail(generics.RetrieveDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer