from django.db import models
from django.conf import settings
from events.models import Shows, Events, Category
# Create your models here.

class Seats(models.Model):
    event = models.ForeignKey(Events, on_delete=models.CASCADE)
    show = models.ForeignKey(Shows, on_delete=models.CASCADE)
    section = models.IntegerField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    sname = models.CharField(max_length=10)
    price = models.IntegerField()
    radius = models.IntegerField()
    color = models.CharField(max_length=10)
    is_booked = models.BooleanField()
    x = models.DecimalField(max_digits=10, decimal_places=3)
    y = models.DecimalField(max_digits=10, decimal_places=3)
    rp = models.CharField(max_length=50)
    rt = models.CharField(max_length=50)
    r = models.IntegerField()
    
    class Meta:
        verbose_name_plural = "Seats"

    def __str__(self):
        return str(self.event) + "-" + str(self.show) + "-" + str(self.show.date) + "-" + str(self.sname)
