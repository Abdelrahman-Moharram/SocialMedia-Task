from accounts.serializers import IncludedUserSerial
from .models import Post
from rest_framework import serializers
from posts.models import Notification
from accounts.serializers import IncludedUserSerial

class ListPostSerial(serializers.ModelSerializer):
    author = IncludedUserSerial()
    class Meta:
        model= Post
        fields= [
            'id',
            'description',
            'image',
            'published_at',
            'author'
        ]


class NotificationsSerial(serializers.ModelSerializer):
    sender = IncludedUserSerial()
    class Meta:
        model= Notification
        fields='__all__'