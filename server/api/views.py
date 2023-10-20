from rest_framework.response import Response
from rest_framework.decorators import api_view

@api_view(['GET'])
def getData(request):
   print(request)
   person = [
      {
      'name':'myApp1',
      'desc':'Sam\'s App.',
      'org':'2001 Developement',
      'platforms':[{'name':'IOS', 'link':'https://www.apple.com/store'},{'name':'Google','link':'https://store.google.com/us/?hl=en-US'}],
      'price':1.2
       },
       {
      'name':'myApp2',
      'desc':'Sam\'s App.',
      'org':'2001 Developement',
      'platforms':[{'name':'IOS', 'link':'https://www.apple.com/store'},{'name':'Google','link':'https://store.google.com/us/?hl=en-US'}],
      'price':0
       }
      ]
   return Response(person) 