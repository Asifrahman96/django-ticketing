from django.shortcuts import render, redirect
from django.contrib import messages, auth
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required, user_passes_test
from django.contrib.auth.mixins import UserPassesTestMixin
from django.contrib.auth.views import PasswordResetView
from django.db.models import Sum, Count, Max
from django.http import JsonResponse, HttpResponse
from django.core import serializers
from django.utils.timezone import datetime
from datetime import datetime

#Create your views here
def register(request):
    #if user is authenticated already and try to use login url, this will redirect to another page
    if request.user.is_authenticated :
        return redirect('home')

    #user registration
    if request.method == 'POST':
        #Get form values
        first_name = request.POST['first_name']
        last_name = request.POST['last_name']
        username = request.POST['username']
        email = request.POST['email']
        password = request.POST['password']
        password2 = request.POST['password2']

        #check if password match
        if password == password2:
            #checks username
            if User.objects.filter(username = username).exists():
                messages.error(request, 'Username is taken, Please try different username')
                return redirect('register')
            else:
                #checks email
                if User.objects.filter(email=email).exists():
                    messages.error(request, 'This email already exists, Please use  different email')
                    return redirect('register')
                else:
                    # looks good
                    # user registered as a new user, now user can log in...
                    user = User.objects.create_user(
                        username=username,
                        password=password,
                        email=email,
                        first_name=first_name,
                        last_name=last_name
                    )

                    #login after registered // if you want user to automatically login
                    # // after registered, use this code below,
                    # auth.login(request, user)

                    # messages.success(request, 'Welcome ! You are now logged in')
                    # return redirect('index')

                    #redirect to login page after registered // if you want user to manually login
                    # // after registered, use this code below,

                    user.save();
                    messages.success(request, 'You are now registered and can log in')
                    return redirect('login')
        else:
            messages.error(request, 'passwords do not match')
            return redirect('register')
    else:
        return render(request, 'accounts/register.html')

def login(request):
    user = User.objects.all()
    print(user)

    #if user is authenticated already and try to use login url, this will redirect to another page
    if request.user.is_authenticated :
        return redirect('home')

    #login authentication
    if request.method == 'POST':
        #login user
        username = request.POST['username']
        password = request.POST['password']
        user = auth.authenticate(username = username, password = password)

        if user is not None:
            auth.login(request, user)
            messages.success(request, 'You are now logged in')
            return redirect('home')
        else:
            messages.error(request, 'Invalid username or password')
            return redirect('login')
    else:
        return render(request, 'accounts/login.html')

def logout(request):
    if request.method == 'POST':
        auth.logout(request)
        # messages.success(request, 'You are now logged out')
        return render(request,'accounts/logout.html')

@login_required
def profile(request):
    users = User.objects.all()
    context = {'users':users, }

    return render(request,'accounts/profile.html', context)

        