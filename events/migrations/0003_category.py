# Generated by Django 3.1.2 on 2020-11-21 13:07

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0002_auto_20201102_1145'),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('category', models.CharField(max_length=100)),
                ('color', models.CharField(max_length=10)),
                ('event', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='events.events')),
                ('show', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='events.shows')),
            ],
            options={
                'verbose_name_plural': 'Categories',
            },
        ),
    ]