from rest_framework import serializers
from .models import App, Platform

class PlatformSerializer(serializers.ModelSerializer):
    class Meta:
        model = Platform
        fields = ('name', 'link')

class AppSerializer(serializers.ModelSerializer):
    platforms = PlatformSerializer(many=True)

    class Meta:
        model = App
        fields = ('id','name','desc','org','platforms','price','approved')

    def create(self, validated_data):
        platforms_data = validated_data.pop('platforms')
        app = App.objects.create(**validated_data)
        for platform_data in platforms_data:
            platform, created = Platform.objects.get_or_create(**platform_data)
            app.platforms.add(platform)
        return app
