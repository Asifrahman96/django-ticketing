# Generated by Django 3.1.2 on 2020-11-02 11:45

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('bookings', '0003_remove_bookings_venue'),
        ('venue', '0006_auto_20201027_1116'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='seats',
            name='venue',
        ),
        migrations.DeleteModel(
            name='Venues',
        ),
    ]
