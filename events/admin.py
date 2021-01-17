from django.contrib import admin
from .models import Events
from .models import Shows
from .models import Category

admin.site.register(Events)

admin.site.register(Shows)

admin.site.register(Category)