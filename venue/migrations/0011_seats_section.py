# Generated by Django 3.1.2 on 2020-11-12 16:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('venue', '0010_auto_20201110_1155'),
    ]

    operations = [
        migrations.AddField(
            model_name='seats',
            name='section',
            field=models.IntegerField(default=1),
            preserve_default=False,
        ),
    ]
