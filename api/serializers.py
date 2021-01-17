from rest_framework import serializers
from venue.models import Seats


#Article Serializer
class SeatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seats
        fields = '__all__'