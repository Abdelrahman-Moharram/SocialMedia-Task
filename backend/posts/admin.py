from django.contrib import admin
from .models import Post, post_like
# Register your models here.
admin.site.register(Post)
admin.site.register(post_like)