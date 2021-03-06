# Generated by Django 3.1.2 on 2020-11-02 10:51

import django.contrib.postgres.fields
from django.db import migrations, models
import django.db.models.deletion
import hashid_field.field


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('events', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Bookings',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('booking_id', hashid_field.field.HashidField(alphabet='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890', min_length=7)),
                ('c_name', models.CharField(max_length=200)),
                ('c_email', models.CharField(max_length=50)),
                ('c_phone', models.CharField(max_length=15)),
                ('venue', models.CharField(max_length=200)),
                ('booked_seats', django.contrib.postgres.fields.ArrayField(base_field=models.CharField(blank=True, max_length=10), size=8)),
                ('booked_date', models.DateTimeField(auto_now_add=True)),
                ('event', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='events.events')),
                ('show', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='events.shows')),
            ],
            options={
                'verbose_name_plural': 'Bookings',
            },
        ),
    ]
