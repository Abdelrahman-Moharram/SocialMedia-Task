from django.db import models
from django.contrib.auth.models import (
    BaseUserManager,
    AbstractBaseUser,
    PermissionsMixin
)
import uuid

from django.conf import settings

class UserAccountManager(BaseUserManager):
    def create_user(self, email, password=None, **kwargs):
        if not email:
            raise ValueError('Users must have an email address')

        email = self.normalize_email(email)

        user = self.model(
            email=email,
            **kwargs
        )
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, password=None, **kwargs):
        user = self.create_user(
            email,
            password=password,
            **kwargs
        )

        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)

        return user

from project.helpers import imagesave

class User(AbstractBaseUser, PermissionsMixin):
    id                  = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    username            = models.CharField(max_length=255)
    email               = models.EmailField(unique=True, max_length=255)
    is_active           = models.BooleanField(default=True)
    is_staff            = models.BooleanField(default=False)
    is_superuser        = models.BooleanField(default=False)
    image               = models.ImageField(default="users/default.jpg",upload_to=imagesave, null=True)
    
    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username',]

    def __str__(self):
        return self.username
    

class Follow (models.Model):
    user                = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='user', on_delete=models.DO_NOTHING)
    following           = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='following', on_delete=models.DO_NOTHING)
    date                = models.DateTimeField(auto_now=True, auto_now_add=False)
    class Meta:
        unique_together = ('following', 'user',)

    def __str__(self):
        return self.user.username

