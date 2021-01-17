from django.shortcuts import render
from rest_framework.generics import ListAPIView, RetrieveAPIView
from .serializers import SeatSerializer
from venue.models import Seats
from events.models import Events, Shows
from django_filters.rest_framework import DjangoFilterBackend

# Create your views here.

class SeatListView(ListAPIView):
    serializer_class = SeatSerializer
    queryset = Seats.objects.order_by('id')

    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('show',)


class SeatDetailView(RetrieveAPIView):
    serializer_class =  SeatSerializer
    queryset = Seats.objects.all()









  