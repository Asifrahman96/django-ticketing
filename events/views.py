from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse, HttpResponseRedirect
from django.db.models import Sum, Count, Max
from events.models import Events, Shows
from venue.models import Seats
from bookings.models import Bookings
from django.contrib.auth.decorators import login_required, user_passes_test
from django_filters.filters import Filter
from django_filters.fields import Lookup
from django.contrib import messages, auth
from django.template import RequestContext
from django.conf import settings

def events(request):
    events  = Events.objects.order_by('-created_date')
    context = { 'events':events }
    
    return render(request, 'events/events.html', context)

def event(request, slug):
    event_detail = get_object_or_404(Events, slug=slug)
    shows = Shows.objects.order_by('date').filter(event=event_detail.id)
    # shows = Shows.objects.order_by('date').filter(is_published=True)

    context = {
        'event_detail': event_detail,
        'shows': shows
    } 

    return render(request, 'events/event.html', context)

def show(request, show_id):
    show = get_object_or_404(Shows, pk=show_id)
    dates = Shows.objects.order_by('date').filter(name=show.name).filter(is_full=False)
    context = {'show':show, 'dates':dates, }
    if request.method == 'POST':
        #Get form values
        ticketTotal = request.POST['ticketTotal']
        seatId = request.POST['seatId']
        seatName = request.POST['seatName']
        request.session['seatId'] = request.POST

        if seatId == '':
            messages.error(request, 'Please select seats to continue !')
            return render(request, 'events/show.html', context)
        else:
            if seatName == '':
                messages.error(request, 'Please select seats to continue !')
                return render(request, 'events/show.html', context)
            else:
                if ticketTotal == '':
                    messages.error(request, 'Please select seats to continue !')
                    return render(request, 'events/show.html', context)
            return redirect('/events/'+ str(show_id) +'/checkout')
    return render(request, 'events/show.html', context)

def checkout(request, show_id,):
    show = get_object_or_404(Shows, pk=show_id)
    bookings = Bookings.objects.all()
    seatId = request.session.get('seatId')
    sId = (seatId['seatId'])
    seatName = (seatId['seatName'])
    #converting strings into array
    sIdx = sId.split(',')
    # removing last empty item in the array
    sIdx = sIdx[:-1]
    
    #converting array into string
    # sIdx = ''.join(sId)

    f_seats = Seats.objects.filter(id__in=sIdx)
    price = Seats.objects.filter(id__in=sIdx).aggregate(Sum('price'))['price__sum']
    tickets = len(sIdx)
    eventId = Shows.objects.values('event_id').filter(id = show_id)
    showId = Shows.objects.values('id').filter(id = show_id)

    context = {
       'f_seats':f_seats,
       'price': price,
       'show': show,
    }

    if request.method == 'POST': 
        seats = Seats.objects.filter(id__in = sIdx)
        seats.update(is_booked=True)

        c_name = request.POST['name']
        c_email = request.POST['email']
        c_phone = request.POST['phoneNumber']
        eventId = eventId
        showId = showId
        seatsId = sId
        seatsName = seatName
        seatsPrice = price

        if bookings.filter( booked_seats = seatsId).exists():
            messages.error(request, 'Selected seat already booked, Please try again !')
            return redirect('home')
        else:
            #submitting form to the database
            bookings = Bookings(
            c_name = c_name,
            c_email = c_email,
            c_phone = c_phone,
            event_id = eventId,
            show_id = showId,
            booked_seats = seatsId,
            booked_seats_name = seatsName,
            booked_price = seatsPrice,
            booked_seats_count= tickets
            )

            b_seats = Bookings.objects.filter(booked_seats = sId)
            print(b_seats)

            context = { 'f_seats':f_seats, 'price':price, 'tickets':tickets, 'b_seats':b_seats,
            'show': show, 'c_name':c_name, 'c_email':c_email, 'c_phone':c_phone, 'booked_seats':seatsId,}

            bookings.save()
            return render(request, 'events/booking_confirmation.html', context)
    return render(request, 'events/checkout.html', context)

def booking_confirmation(request, show_id,):
    show = get_object_or_404(Shows, pk=show_id)
    
    return render(request, 'events/booking_confirmation.html')