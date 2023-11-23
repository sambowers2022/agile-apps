from django.urls import path, include
from .views import AppListView, AppApprovalView, register, login, CommentView, CommentListCreateView
urlpatterns = [
    path('apps/', AppListView.as_view(), name='app-list'),
    path('pending/', AppApprovalView.as_view(), name='pending-list'),
    path('login/', login, name='login'),
    path('register/', register, name='register'),
    path('comments/', CommentView.as_view(), name='comment-list'),
    path('post/', CommentListCreateView.as_view(), name='comment-list'),
]
