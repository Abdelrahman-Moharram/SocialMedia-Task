from django.contrib import admin
from .models import Post, post_like, Notification
# Register your models here.


admin.site.register(Post)
admin.site.register(post_like)
admin.site.register(Notification)
