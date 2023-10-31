from django.urls import path, include
from .views import AppListView, AppApprovalView, register, login
urlpatterns = [
    path('apps/', AppListView.as_view(), name='app-list'),
    path('pending/', AppApprovalView.as_view(), name='pending-list'),
    path('login/', login, name='login'),
    path('register/', register, name='register'),
]
