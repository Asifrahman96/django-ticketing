# Generated by Django 3.1.2 on 2020-11-17 11:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bookings', '0006_bookings_booked_seats_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='bookings',
            name='booked_price',
            field=models.IntegerField(default=1),
            preserve_default=False,
        ),
    ]
