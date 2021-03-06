# Generated by Django 3.1.2 on 2020-11-21 13:07

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0003_category'),
        ('venue', '0011_seats_section'),
    ]

    operations = [
        migrations.AddField(
            model_name='seats',
            name='category',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='events.category'),
            preserve_default=False,
        ),
    ]
