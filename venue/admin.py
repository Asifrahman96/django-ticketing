from django.contrib import admin
from .models import Seats

# Register your models here.

# Register your models here.
class SeatsAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'sname',
        'event',
        # 'show',
        'section',
        'x',
        'y',
        'radius',
        'color',
        'r',
        'rt',
        'rp',
        'is_booked',

    )
    list_display_links = ('id',)
    list_editable = ('radius','is_booked','color','r','rt','rp','sname','x','y','section',)
    list_filter = ('show',)
    search_fields = ('event',)

admin.site.register(Seats, SeatsAdmin)
