from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from .models import Post, Notification
from accounts.models import Follow
from .Serializer import ListPostSerial, NotificationsSerial
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes

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

    posts = Post.objects.filter(author__in=list_followers).order_by('-published_at') # get their posts
    posts_serial = ListPostSerial(data=posts, many=True)

    if not posts_serial.is_valid():
        pass

    return Response(
        data={
            'posts': posts_serial.data
        },
        status=status.HTTP_200_OK
    )



@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def notifications(request):
    size = request.GET.get('size')
    if size:
        size = int(size)
        notifications_serial = NotificationsSerial(data=Notification.objects.filter(receiver=request.user).order_by('-date')[:size], many=True)
    else:
        notifications_serial = NotificationsSerial(data=Notification.objects.filter(receiver=request.user).order_by('-date'), many=True)
    if notifications_serial.is_valid():
            pass
    return Response(
        data={
            'notifications': notifications_serial.data,
        },
        status=status.HTTP_200_OK
    )

@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def read_notifications(request):
    Notification.objects.filter(receiver=request.user).update(is_read=True)

    return Response(data={'message': 'notificaion read successfully'}, status=status.HTTP_200_OK)
    