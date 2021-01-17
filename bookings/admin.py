from django.contrib import admin
from .models import Bookings

# Register your models here.

# Register your models here.
class BookingsAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'booking_id',
        'c_name',
        'c_email',
        'event',
        'show',
        'booked_seats'
    )


admin.site.register(Bookings, BookingsAdmin)