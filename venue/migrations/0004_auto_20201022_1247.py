# Generated by Django 3.1.2 on 2020-10-22 12:47

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0001_initial'),
        ('venue', '0003_auto_20201020_1453'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='seats',
            name='seats',
        ),
        migrations.AddField(
            model_name='seats',
            name='event',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='events.events'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='seats',
            name='is_available',
            field=models.BooleanField(default=1),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='seats',
            name='is_booked',
            field=models.BooleanField(default=1),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='seats',
            name='name',
            field=models.CharField(default=2, max_length=10),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='seats',
            name='price',
            field=models.IntegerField(default=5),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='seats',
            name='radius',
            field=models.IntegerField(default=5),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='seats',
            name='x',
            field=models.DecimalField(decimal_places=3, default=1, max_digits=10),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='seats',
            name='y',
            field=models.DecimalField(decimal_places=3, default=1, max_digits=10),
            preserve_default=False,
        ),
    ]
