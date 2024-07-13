from django.db import models
import uuid
from django.conf import settings




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