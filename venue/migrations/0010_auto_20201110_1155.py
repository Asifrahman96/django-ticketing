# Generated by Django 3.1.2 on 2020-11-10 11:55

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('venue', '0009_auto_20201109_1223'),
    ]

    operations = [
        migrations.RenameField(
            model_name='seats',
            old_name='row',
            new_name='r',
        ),
    ]
