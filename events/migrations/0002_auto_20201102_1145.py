# Generated by Django 3.1.2 on 2020-11-02 11:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='shows',
            name='venue',
        ),
        migrations.AddField(
            model_name='events',
            name='location',
            field=models.CharField(default=1, max_length=200),
            preserve_default=False,
        ),
    ]