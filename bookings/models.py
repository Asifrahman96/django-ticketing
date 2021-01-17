from django.db import models
from django.conf import settings
from venue.models import Seats
from events.models import Events, Shows
from django.contrib.postgres.fields import ArrayField
from django.conf import settings
from django.db.models.signals import pre_save
from bookings.utils import unique_booking_id_generator

# Create your models here.
class Bookings(models.Model):
    booking_id = models.CharField(max_length=120, blank=True)
    c_name = models.CharField(max_length=200)
    c_email = models.CharField(max_length=50)
    c_phone = models.CharField(max_length=15)
    event = models.ForeignKey(Events, on_delete=models.CASCADE)
    show = models.ForeignKey(Shows, on_delete=models.CASCADE)
    booked_seats = models.CharField(max_length=100)
    booked_seats_name = models.CharField(max_length=200)
    booked_date = models.DateTimeField(auto_now_add=True)
    booked_price = models.IntegerField()
    booked_seats_count = models.IntegerField()

    class Meta:
        verbose_name_plural = "Bookings"

    def __str__(self):
        return str(self.booking_id) + "-" + str(self.c_name)


def pre_save_create_booking_id(sender, instance, *args, **kwargs):
    if not instance.booking_id:
        instance.booking_id = unique_booking_id_generator(instance)

pre_save.connect(pre_save_create_booking_id, sender=Bookings)