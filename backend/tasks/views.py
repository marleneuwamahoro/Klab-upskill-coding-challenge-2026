from rest_framework import generics
from .models import Task
from .serializers import TaskSerializer


class TaskListCreateView(generics.ListCreateAPIView):
    queryset = Task.objects.all().order_by("-createdAt")
    serializer_class = TaskSerializer