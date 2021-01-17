from django.urls import path,include
from . import views
    
app_name = 'events'

urlpatterns = [
    path('',views.events, name="events"),
    path('<int:show_id>/checkout',views.checkout, name="checkout"),
    path('<int:show_id>/booking_confirmation',views.booking_confirmation, name="booking_confirmation"),
    path('<int:show_id>',views.show, name="show"),
    path('<slug>',views.event, name="event"),
]