from django.test import TestCase
from faker import Faker
from .views import AppListView
from rest_framework.test import APIClient

# Create your tests here.

# Creates test app entries
class CreateApps(TestCase):
    def create(self):
        fake = Faker()
        client = APIClient()
        for _ in range(10):
            request = client.post('/api/apps/', {'name':fake.domain_name(),'org':fake.company(),'desc':fake.catch_phrase(), 'platforms':[{'name':fake.domain_name(),'link':fake.uri()}], 'price':(fake.random_number(digits=4)/100)}, format="json")

class CommentTest(TestCase):
    def post(self):
        client = APIClient()
        if (client.post('/api/comments/', {'user':'Test', 'content':'This is a test comment.'}, format="json").status_code != 201):
            raise Exception("Comment failed to post.")