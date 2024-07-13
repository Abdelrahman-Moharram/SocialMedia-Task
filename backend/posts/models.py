from django.db import models
import uuid
from django.conf import settings

from django.db.models.signals import post_save
from django.dispatch import receiver
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from accounts.models import Follow

class Post(models.Model):
    id                  = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    description         = models.TextField(null=True, blank=True)
    image               = models.ImageField(upload_to='images/posts/', null=True, blank=True)
    published_at        = models.DateTimeField(auto_now=True, auto_now_add=False)
    author              = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.DO_NOTHING)

    def __str__(self):
        return self.description
    



class post_like(models.Model):
    id                  = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    post                = models.ForeignKey(Post, on_delete=models.DO_NOTHING)
    user                = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.DO_NOTHING)

    class Meta:
        unique_together = ('post', 'user',)


class Notification(models.Model):
    id                  = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    message             = models.TextField(null=True, blank=True)
    is_read             = models.BooleanField(default=False)
    post                = models.ForeignKey(Post, on_delete=models.CASCADE, null=True, blank=True)
    date                = models.DateTimeField(auto_now_add=True)
    receiver            = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='receiver')
    sender              = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True, blank=True, related_name='sender')
    def __str__(self):
        return self.message

