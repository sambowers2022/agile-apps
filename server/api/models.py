from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
import uuid

# User creation
class UserManager(BaseUserManager):
    def create_user(self, username, password=None):
        user = self.model(username=username)
        user.set_password(password)
        user.save()
        return user

# User model
class User(AbstractBaseUser):
    username = models.CharField(max_length=50, unique=True)
    password = models.CharField(max_length=100)
    access_level = models.IntegerField(default=1)
    
    is_active = models.BooleanField(default=True)
    
    objects = UserManager()
    
    USERNAME_FIELD = 'username'


class Token(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    token = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.token
    
# Platform model (used by App)
class Platform(models.Model):
    name = models.CharField(max_length=100)
    link = models.URLField()

    def __str__(self):
        return self.name

# App model
class App(models.Model):
    name = models.CharField(max_length=100)
    desc = models.TextField()
    org = models.CharField(max_length=100)
    # 
    platforms = models.ManyToManyField(Platform, related_name='apps')
    price = models.DecimalField(max_digits=5, decimal_places=2)
    approved = models.BooleanField(default=False)

    def __str__(self):
        return self.name

# Comment model
class Comment(models.Model):
    user = models.ForeignKey("User",on_delete=models.CASCADE)
    app = models.ForeignKey("App",on_delete=models.CASCADE)
    content = models.CharField(max_length=500)