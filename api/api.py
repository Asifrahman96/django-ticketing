from venue.models import Seats
from rest_framework import viewsets, permissions
from .serializers import SeatSerializers

#Article Viewsets

class SeatViewSet(viewsets.ModelViewSet):
    queryset = Seats.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = SeatSerializer