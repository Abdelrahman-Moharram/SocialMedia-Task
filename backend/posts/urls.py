from django.urls import path
from .views import *
app_name = 'posts'

urlpatterns = [
    path('', index, name='index'),
    path('notifications/', notifications, name='notifications'),
    path('notifications/read/', read_notifications, name='notifications'),

]
