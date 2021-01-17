from django.urls import path,include
from .views import SeatListView, SeatDetailView

urlpatterns = [
    path('', SeatListView.as_view()),
    path('<int:pk>', SeatDetailView.as_view())
]
