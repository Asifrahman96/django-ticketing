from django.urls import path,include
from . import views
    
app_name = 'bookings'

urlpatterns = [
    path('',views.bookings_events, name="bookings_events"),
    path('<slug>',views.bookings_dashboard, name="bookings_dashboard"),
    path('manage_bookings/<int:show_id>',views.manage_bookings_detail, name="manage_bookings_detail"),
    path('<slug>/manage_bookings',views.manage_bookings, name="manage_bookings"),
    path('statistics/<int:show_id>',views.statistics_detail, name="statistics_detail"),
    path('<slug>/statistics',views.statistics, name="statistics"),
    path('attendees/<int:show_id>',views.attendees_detail, name="attendees_detail"),
    path('<slug>/attendees',views.attendees, name="attendees"),
]