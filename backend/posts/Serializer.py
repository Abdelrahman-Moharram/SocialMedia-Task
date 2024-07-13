from accounts.serializers import IncludedUserSerial
from .models import Post
from rest_framework import serializers

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