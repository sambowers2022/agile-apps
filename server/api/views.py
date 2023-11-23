from django.db import IntegrityError
from django.http import HttpResponseBadRequest, HttpResponseNotFound
from django.shortcuts import get_object_or_404, render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.pagination import PageNumberPagination
from rest_framework.decorators import api_view
from rest_framework.authtoken.models import Token
from django.views.decorators.csrf import csrf_exempt
from django.db.models.functions import Lower

from rest_framework import generics



from .serializers import AppSerializer, CommentSerializer
from .models import App, User, Token, Comment

def auth(token, auth):
    return Token.objects.get(token=token).user.access_level >= auth

@api_view(['POST'])
def register(request):
    username = request.data.get('name')
    password = request.data.get('pwd')

    try:
        user = User.objects.create_user(username, password)
        token = Token.objects.create(user=user)
        return Response({'token': token.token,'message': 'User created successfully'}, status=status.HTTP_201_CREATED)
    except IntegrityError:
        return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@csrf_exempt
def login(request):
    username = request.data.get('name')
    password = request.data.get('pwd')
    print(username, password)
    
    try:
        user = User.objects.get(username=username)
        if user.check_password(password):
            token, c = Token.objects.get_or_create(user=user)
            print(token.token)
            response_data = {'token': token.token}
            return Response({'token': token.token, 'auth': user.access_level, 'id':user.id,'message': 'Login successfull.'}, status=status.HTTP_200_OK)
        else:
            return HttpResponseBadRequest()
    except User.DoesNotExist:
        return HttpResponseNotFound()

        
def api_view(request):
    token = request.META.get('HTTP_AUTHORIZATION')
    if not token:
        return HttpResponseBadRequest()
    
    try:
        token_obj = Token.objects.get(token=token)
        user = token_obj.user
        # Access user and access level
    except Token.DoesNotExist:
        return HttpResponseBadRequest()  
        
    # Return API response

class AppListView(APIView):
    def get(self, request):
        q = request.query_params

        # Get objects sorted in given order
        sort = q.get('order_by', 'id')
        if (sort != 'id' and sort != 'price'):
            sort = Lower(q.get('order_by'))
        apps = App.objects.all().order_by(sort)

        # Apply Filters
        apps = apps.filter(approved=True).filter(org__contains=q.get('org','')).filter(desc__contains=q.get('desc','')).filter(name__contains=q.get('name',''))

        # Apply platform filter
        if (q.get('platform') is not None):
            apps = apps.filter(platforms__name__contains=q.get('platform'))

        # Apply Pagination
        page = int(q.get('page', 1))
        page_size = 10 # <-- Can change page size here
        apps = apps[(page - 1) * page_size: page * page_size]

        # Generate response
        serializer = AppSerializer(apps, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = AppSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class AppApprovalView(APIView):
    def get(self, request):
        apps = App.objects.filter(approved=False)
        serializer = AppSerializer(apps, many=True)
        return Response(serializer.data)

    def post(self, request):
        if (not auth(request.data.get('token'), 3)):
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        app_id = request.data.get('id')
        approved = request.data.get('approved')

        try:
            app = App.objects.get(id=app_id)
        except App.DoesNotExist:
            return Response({"detail": "App not found"}, status=status.HTTP_404_NOT_FOUND)

        if approved:
            app.approved = True
            app.save()
            serializer = AppSerializer(app)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            app.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        
class CommentView(APIView):
    def get(self, request):
        app = App.objects.get(id=request.query_params.get('id'))
        comments = Comment.objects.filter(app=app)
        return Response(CommentSerializer(comments, many=True).data, status=status.HTTP_200_OK)
    def post(self, request):
        if (not auth(request.data.get('token'), 2)):
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        try:
            comment = Comment.objects.get(id=request.data.get('id'))
        except Comment.DoesNotExist:
            return Response({"detail": "Comment not found"}, status=status.HTTP_404_NOT_FOUND)
        comment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
        


class CommentListCreateView(generics.ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
