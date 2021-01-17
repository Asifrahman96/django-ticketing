from django.urls import path, include
from . import views
from django.contrib.auth import views as auth_views
from django.contrib.auth.decorators import login_required, user_passes_test

urlpatterns = [
    path('login', views.login, name='login'),
    path('register', views.register, name="register"),
    path('profile', views.profile, name="profile"),
    path('logout', views.logout, name="logout"),
]
