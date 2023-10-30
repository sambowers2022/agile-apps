from django.db import models

class Platform(models.Model):
    name = models.CharField(max_length=100)
    link = models.URLField()

    def __str__(self):
        return self.name

class App(models.Model):
    name = models.CharField(max_length=100)
    desc = models.TextField()
    org = models.CharField(max_length=100)
    platforms = models.ManyToManyField(Platform, related_name='apps')
    price = models.DecimalField(max_digits=5, decimal_places=2)
    approved = models.BooleanField(default=False)

    def __str__(self):
        return self.name
