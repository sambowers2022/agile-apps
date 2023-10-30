from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.pagination import PageNumberPagination

from .serializers import AppSerializer
from .models import App



class AppListView(APIView):


    def get(self, request):
        page = int(request.GET.get('page', 1))  # Get the requested page number from the query parameters
        page_size = 24  # Define the number of items per page

        # Calculate the starting and ending indices for the pagination
        start_index = (page - 1) * page_size
        end_index = page * page_size

        apps = App.objects.filter(approved=True)[start_index:end_index]
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