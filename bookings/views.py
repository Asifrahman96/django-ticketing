from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse, HttpResponseRedirect
from django.db.models import Sum, Count, Max
from events.models import Events, Shows, Category
from venue.models import Seats
from bookings.models import Bookings
from django.contrib.auth.decorators import login_required, user_passes_test
from django_filters.filters import Filter
from django_filters.fields import Lookup
from django.contrib import messages, auth
from django.template import RequestContext
from django.conf import settings

# Create your views here.
def bookings_events(request):
    events = Events.objects.filter(is_published=True).order_by('-created_date')
    inLive = Events.objects.filter(is_published=True).count()
    offline = Events.objects.filter(is_published=False).count()
    total = Events.objects.all().count()

    context = {'events': events, 'inLive': inLive,
               'offline': offline, 'total': total,}

    return render(request, 'bookings/bookings_events.html', context)

def bookings_dashboard(request, slug):
    event_detail = get_object_or_404(Events, slug=slug)
    shows = Shows.objects.order_by('date').filter(event=event_detail.id)

    total_revenue = Seats.objects.filter(event = event_detail.id).filter(is_booked = True).aggregate(Sum('price'))
    tickets_sold = Seats.objects.filter(event = event_detail.id).filter(is_booked = True).count()

    attendees = Bookings.objects.filter(event = event_detail.id).count()

    context = {
        'event_detail': event_detail,
        'shows': shows,
        'total_revenue':total_revenue,
        'tickets_sold':tickets_sold,
        'attendees':attendees,
    }

    return render(request, 'bookings/bookings_dashboard.html', context)

def manage_bookings(request, slug):
    event_detail = get_object_or_404(Events, slug=slug)
    shows = Shows.objects.order_by('date').filter(event=event_detail.id)
     
    context = {
        'event_detail': event_detail,
        'shows': shows,   
    }

    return render(request, 'bookings/manage_bookings.html', context)

def statistics(request, slug):
    event_detail = get_object_or_404(Events, slug=slug)
    shows = Shows.objects.order_by('date').filter(event=event_detail.id)
    total_revenue = Seats.objects.filter(event = event_detail.id).filter(is_booked = True).aggregate(Sum('price'))

    tickets_sold = Seats.objects.filter(event = event_detail.id).filter(is_booked = True).count()
    seats_avail = Seats.objects.filter(event = event_detail.id).count()
 
    #queries for chart
    daily_count = Bookings.objects.filter(event = event_detail.id).values('booked_date__date').order_by('booked_date__date').annotate(sum =Sum('booked_seats_count'))
    daily_price = Bookings.objects.filter(event = event_detail.id ).values('booked_date__date').order_by('booked_date__date').annotate(sum =Sum('booked_price'))
    
    show_id = Shows.objects.values('id').filter(event = event_detail.id)
    total_seats = Seats.objects.filter(show__in = show_id)
 
    #for category_chart
    category_count = Seats.objects.filter(event = event_detail.id).filter(is_booked = True).values('category__category').annotate(count = Count('category_id'))
   
    print(category_count)

    context = {
        'total_revenue':total_revenue,
        'tickets_sold':tickets_sold,
        'seats_avail':seats_avail,
        'event_detail': event_detail,
        'shows': shows,
        'daily_count':daily_count,
        'daily_price':daily_price,
        'total_seats':total_seats,
        'category_count':category_count,
    }
    
    return render(request, 'bookings/statistics.html', context)


def statistics_detail(request, show_id):
    show = get_object_or_404(Shows, pk=show_id)
    dates = Shows.objects.order_by('date').filter(name=show.name).filter(is_full=False)

    tickets_sold = Seats.objects.filter(show = show.id).filter(is_booked = True).count()
    total_seats = Seats.objects.filter(show = show.id).count()

    daily_count = Bookings.objects.filter(show = show.id).values('booked_date__date').order_by('booked_date__date').annotate(sum = Sum('booked_seats_count'))
    category_count = Seats.objects.filter(show = show.id).filter(is_booked = True).values('category__category').annotate(count = Count('category_id'))
     
    context = {
        'show': show,
        'dates':dates,
        'tickets_sold':tickets_sold,
        'total_seats':total_seats,
        'daily_count':daily_count,
        'category_count':category_count,
    }

    return render(request, 'bookings/statistics_detail.html', context)

def manage_bookings_detail(request, show_id):
    show = get_object_or_404(Shows, pk=show_id)
    dates = Shows.objects.order_by('date').filter(name=show.name).filter(is_full=False)
    bookings = Bookings.objects.filter(show = show_id).order_by('-booked_date')
    bookings_done = Bookings.objects.filter(show = show_id).count()
    seats_avail = Seats.objects.filter(show=show_id).count()

    # print(bookings_done, seats_avail)
    # b_seats = bookings.values_list("booked_seats", flat=True) 
    # b_seats_list = list(b_seats)

    context = {'show': show, 'dates': dates, 'bookings':bookings, 'bookings_done':bookings_done, 'seats_avail':seats_avail,}
    return render(request, 'bookings/manage_bookings_detail.html', context)

def attendees(request, slug):
    event_detail = get_object_or_404(Events, slug=slug)
    shows = Shows.objects.order_by('date').filter(event=event_detail.id)
    attendees = Bookings.objects.filter(event = event_detail.id).order_by('-booked_date')

    context = {
        'event_detail': event_detail,
        'shows': shows,
        'attendees':attendees,
    }
        
    return render(request, 'bookings/attendees.html', context)

def attendees_detail(request, show_id):
    show = get_object_or_404(Shows, pk=show_id)
    dates = Shows.objects.order_by('date').filter(name=show.name).filter(is_full=False)
    attendees = Bookings.objects.filter(show = show_id).order_by('-booked_date')

    context = {
        'show': show,
        'dates':dates,
        'attendees':attendees,
    }

    return render(request, 'bookings/attendees_detail.html', context)
