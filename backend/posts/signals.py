from django.db.models.signals import post_save
from django.dispatch import receiver
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from .models import Notification, Post

from accounts.models import Follow
@receiver(post_save, sender=Post)
def notification_created(sender, instance, created, **kwargs):
    if created:
        followers = Follow.objects.filter(following=instance.author)
        message = f" published a new Post "
        for follower in followers:
            notify = Notification.objects.create(receiver=follower.user, message=message, sender_id=instance.author.id, post=instance)
            notify.save()
            channel_layer = get_channel_layer()

            async_to_sync(channel_layer.group_send)(
                'notification_'+str(follower.user.id),
                {
                    "type": "send_notification",
                    "message": 1,
                }
            )