from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from .models import User

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['id'] = str(user.id)
        token['email'] = user.email
        token['username'] = user.username
        token['image'] = user.image.url


        return token


class IncludedUserSerial(serializers.ModelSerializer):
    class Meta:
        model= User
        depth=1
        fields= ['id','username', 'image']

class BaseUserSerial(serializers.ModelSerializer):
    class Meta:
        model= User
        fields=['id', 'email', 'username', 'image']

class UserSerial(serializers.ModelSerializer):
    class Meta:
        model= User
        fields=['id', 'email', 'username']