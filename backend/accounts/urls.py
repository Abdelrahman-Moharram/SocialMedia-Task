from django.urls import path, re_path
from .views import (
    # CustomProviderAuthView,
    CustomTokenObtainPairView,
    CustomTokenRefreshView,
    CustomTokenVerifyView,
    LogoutView,


    search,
    profile,
    followuser,
    unfollowuser
)
app_name='accounts'
urlpatterns = [
    path('jwt/create/', CustomTokenObtainPairView.as_view()),
    path('jwt/refresh/', CustomTokenRefreshView.as_view()),
    path('jwt/verify/', CustomTokenVerifyView.as_view()),
    path('jwt/logout/', LogoutView.as_view()),
    path('search', search, name='search'),


    path('profile/<str:user_id>', profile, name='profile'),

    path('profile/<str:user_id>/follow', followuser, name='followuser'),
    path('profile/<str:user_id>/unfollow', unfollowuser, name='unfollowuser'),
]