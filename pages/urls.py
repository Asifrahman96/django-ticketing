from django.urls import path,include
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.conf.urls.static import static
from django.conf import settings
from . import views

urlpatterns = [
    path('', views.home, name="home"),
    path('timeout', views.timeout, name="timeout"),
    path('emptybasket', views.emptybasket, name="emptybasket"),
    path('events/', include('events.urls')),
    path('bookings/', include('bookings.urls')), 
    path('accounts/', include('accounts.urls')), 
    path('api/', include('api.urls')),  
]

urlpatterns += staticfiles_urlpatterns()
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
