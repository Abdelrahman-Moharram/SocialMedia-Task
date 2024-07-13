from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import permission_classes, api_view
from .models import User, Follow
from .serializers import MyTokenObtainPairSerializer, BaseUserSerial
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)
from django.db.models import Q
from posts.models import Post
from posts.Serializer import ListPostSerial
class CustomTokenObtainPairView(TokenObtainPairView):
    serilizer_class = MyTokenObtainPairSerializer
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)

        if response.status_code == 200:
            access_token = response.data.get('access')
            refresh_token = response.data.get('refresh')

            response.set_cookie(
                'access',
                access_token,
                max_age=settings.AUTH_COOKIE_MAX_AGE,
                secure=True,
                httponly=False,
                samesite='None',
                
                
            )
            response.set_cookie(
                'refresh',
                refresh_token,
                max_age=settings.AUTH_COOKIE_MAX_AGE,
                secure=True,
                httponly=False,
                samesite='None',
                
            )

        return response


class CustomTokenRefreshView(TokenRefreshView):
    serilizer_class = MyTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get('refresh')

        if refresh_token:
            request.data['refresh'] = refresh_token

        response = super().post(request, *args, **kwargs)

        if response.status_code == 200:
            access_token = response.data.get('access')

            response.set_cookie(
                'access',
                access_token,
                max_age=settings.AUTH_COOKIE_MAX_AGE,
                secure=True,
                httponly=False,
                samesite='None',
                
            )

        return response


class CustomTokenVerifyView(TokenVerifyView):
    serilizer_class = MyTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        access_token = request.COOKIES.get('access')

        if access_token:
            request.data['token'] = access_token

        return super().post(request, *args, **kwargs)

@permission_classes([AllowAny])
class LogoutView(APIView):
    def post(self, request, *args, **kwargs):
        response = Response(status=status.HTTP_204_NO_CONTENT)
        response.delete_cookie('access')
        response.delete_cookie('refresh')

        return response

@api_view(['GET'])
@permission_classes([AllowAny])
def profile(request, user_id):
    user = User.objects.filter(id=user_id).first()
    if not user:
        return Response(data={'detail':"this user is not found"}, status=status.HTTP_404_NOT_FOUND)
    posts = Post.objects.filter(author=user)

    users_serial = BaseUserSerial(data=[user], many=True)
    posts_serial = ListPostSerial(data=posts, many=True)

    if not users_serial.is_valid():
        pass
    
    if not posts_serial.is_valid():
        pass
    is_follower = False
    if request.user.is_authenticated and Follow.objects.filter(user=request.user, following=user_id).count() > 0:
        is_follower = True

    return Response(
        data={
            'user': users_serial.data[0],
            'posts': posts_serial.data,
            'is_follower': is_follower
        }
    )

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def followuser(request, user_id):
    if not User.objects.filter(id=user_id).count():
        return Response(data={'detail':'this user is not found'}, status=status.HTTP_404_NOT_FOUND)

    newfollow = Follow.objects.create(user=request.user, following_id=user_id)
    newfollow.save()
    return Response(data={'message':'followed successfully'}, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def unfollowuser(request, user_id):
    if not User.objects.filter(id=user_id).count():
        return Response(data={'detail':'this user is not found'}, status=status.HTTP_404_NOT_FOUND)

    unfollow = Follow.objects.filter(user=request.user, following_id=user_id)
    if unfollow:
        unfollow.delete()
        return Response(data={'message':'unfollowed successfully'}, status=status.HTTP_200_OK)
    if not User.objects.filter(id=user_id).count():
        return Response(data={'detail':'this user is not found'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([AllowAny])
def search(request):
    query = request.GET.get('query')
    size = request.GET.get('size')
    if not query:
        return Response(data={'detail': 'invalid search query'}, status=status.HTTP_400_BAD_REQUEST)
    
    if size:
        size = int(size)
        users = User.objects.filter(
                Q(username__contains=query) | Q(email__contains=query)
            ).exclude(id=request.user.id)[:size]
    else:
        users = User.objects.filter(
                Q(username__contains=query) | Q(email__contains=query)
            ).exclude(id=request.user.id)
    users_serial = BaseUserSerial(data=users, many=True)



    if  not users_serial.is_valid():
        pass
    return Response(data={
            'users':users_serial.data
        },
        status=status.HTTP_200_OK
    )


