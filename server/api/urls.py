from django.urls import path
from .views import AppListView, AppApprovalView
urlpatterns = [
    path('apps/', AppListView.as_view(), name='app-list'),
    path('pending/', AppApprovalView.as_view(), name='pending-list')
]
