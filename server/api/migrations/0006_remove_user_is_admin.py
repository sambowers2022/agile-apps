# Generated by Django 4.2.6 on 2023-10-31 15:46

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_token_user_delete_customuser_token_user'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='is_admin',
        ),
    ]
