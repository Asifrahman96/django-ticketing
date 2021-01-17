from django.db import models
from embed_video.fields import EmbedVideoField
from django.conf import settings

class Events(models.Model):
    name = models.CharField(max_length=200)
    slug = models.CharField(max_length=200, blank=True)
    desc = models.TextField()
    location = models.CharField(max_length=200)
    release_date = models.DateField()
    starting_price = models.IntegerField()
    cast = models.TextField(blank=True)
    cover_image = models.ImageField(blank=True)
    promo = EmbedVideoField(blank=True)
    is_published = models.BooleanField(default=False)
    is_cover = models.BooleanField(default=False)
    created_date = models.DateTimeField(auto_now_add=True)

    def snippet(self):
        return self.desc[:120] + ''

    def event_snippet(self):
        return self.desc[:500] + ' ...'

    class Meta:
        verbose_name_plural = "Events"

    def __str__(self):
        return self.name


class Shows(models.Model):
    name = models.CharField(max_length=200)
    event = models.ForeignKey(Events, on_delete=models.CASCADE)
    date = models.DateField()
    time = models.TimeField()
    is_published = models.BooleanField(default=False)
    is_full = models.BooleanField(default=False)

    class Meta:
        verbose_name_plural = "Shows"

    def __str__(self):
        return str(self.event) + "-" + str(self.name) + "-" + str(self.date) + "-" + str(self.time)


class Category(models.Model):
    category = models.CharField(max_length=100)
    event = models.ForeignKey(Events, on_delete=models.CASCADE)
    show = models.ForeignKey(Shows, on_delete=models.CASCADE)
    color = models.CharField(max_length=10)

    class Meta:
        verbose_name_plural = "Categories"

    def __str__(self):
        return str(self.category)