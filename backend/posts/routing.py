from django.urls import re_path, path
from . import consumers


websocket_urlpatterns = [
    path("ws/notify/<str:id>/", consumers.NotificationConsumer.as_asgi()),
]