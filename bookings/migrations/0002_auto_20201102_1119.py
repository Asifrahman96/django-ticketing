# Generated by Django 3.1.2 on 2020-11-02 11:19

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('venue', '0006_auto_20201027_1116'),
        ('bookings', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bookings',
            name='venue',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='venue.venues'),
        ),
    ]
