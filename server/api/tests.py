from django.test import TestCase
from faker import Faker
from .views import AppListView
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from .models import App
from .serializers import AppSerializer

# Create your tests here.

# Creates test app entries
class CreateApps(TestCase):
    def create(self):
        fake = Faker()
        client = APIClient()
        for _ in range(10):
            request = client.post('/api/apps/', {'name':fake.domain_name(),'org':fake.company(),'desc':fake.catch_phrase(), 'platforms':[{'name':fake.domain_name(),'link':fake.uri()}], 'price':(fake.random_number(digits=4)/100)}, format="json")

# Test calls to comment api
class CommentTest(TestCase):
    def post(self):
        client = APIClient()
        if (client.post('/api/comments/', {'appId': 11, 'user':'Test', 'content':'This is a test comment.'}, format="json").status_code != 201):
            raise Exception("Comment failed to post.")
    def get(self):
        client = APIClient()
        if (client.get('/api/comments/').status_code != 200):
            raise Exception("Failed to get all comments")
        if (client.get('/api/comments/?id=12').status_code != 200):
            raise Exception("Failed to get comments for specific app ID = 12.")
        
# Test queries on comment 
class AppTests(TestCase):
    def setUp(self):
        App.objects.create(name='Test App 1', org='Test Org 1', desc='Description 1', approved=True, price=10.0)
        App.objects.create(name='Test App 2', org='Test Org 2', desc='Description 2', approved=True, price=20.0)
        App.objects.create(name='Test App 3', org='Test Org 3', desc='Description 3', approved=False, price=30.0)

    def test_get_apps_list(self):
        client = APIClient()
        url = reverse('app-list')
        response = client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 3)
        self.assertEqual(response.data[0]['id'], 1)
        self.assertEqual(response.data[1]['id'], 2)
        self.assertEqual(response.data[2]['id'], 3)

    def test_filter_apps_by_name(self):
        client = APIClient()
        url = reverse('app-list')
        response = client.get(url, {'filter': 'name', 'val': 'Test App 1'})

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['id'], 1)