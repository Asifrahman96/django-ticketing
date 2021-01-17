from django.shortcuts import render, redirect
from django.http import HttpResponse
from events.models import Events, Shows


def home(request):
    featured = Events.objects.order_by('-created_date').filter(is_published=True).filter(is_cover=True)
    events = Events.objects.order_by('-created_date').filter(is_published=True)

    context = { 'featured':featured, 'events':events }

    return render(request, 'pages/home.html', context)

def timeout(request):

    return render(request, 'pages/timeout.html')

def emptybasket(request):

    return render(request, 'pages/emptybasket.html')