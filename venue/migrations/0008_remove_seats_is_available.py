# Generated by Django 3.1.2 on 2020-11-04 12:23

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('venue', '0007_auto_20201102_1145'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='seats',
            name='is_available',
        ),
    ]
