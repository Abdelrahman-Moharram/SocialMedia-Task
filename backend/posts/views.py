from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from .models import Post
from accounts.models import Follow
from .Serializer import ListPostSerial
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes, renderer_classes

@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def index(request):
    list_followers = Follow.objects.filter(user = request.user).values('following') # get list of users current user follows
    if not list_followers:
        return Response(
            data={
                'posts': []
            },
            status=status.HTTP_200_OK
        )

    posts = Post.objects.filter(author__in=list_followers) # get their posts
    posts_serial = ListPostSerial(data=posts, many=True)

    if not posts_serial.is_valid():
        pass

    return Response(
        data={
            'posts': posts_serial.data
        },
        status=status.HTTP_200_OK
    )