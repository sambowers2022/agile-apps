from django.contrib import admin
from .models import User, App, Comment

# Register your models here.
admin.site.register(User)
admin.site.register(App)
admin.site.register(Comment)