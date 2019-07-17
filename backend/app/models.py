from django.db import models
from django.utils.translation import gettext as _
# Create your models here.


class Inventory(models.Model):
    name = models.CharField(_("name"), max_length=50)
    description = models.CharField(_("description"), max_length=200)
    reorder_level = models.IntegerField(_("reorder_level"))
    quantity = models.IntegerField(_("quantity"))

    def __str__(self):
        return self.name

class Sale(models.Model):
    inventory = models.ForeignKey("app.Inventory", verbose_name=_(
        "inventory"), on_delete=models.CASCADE)
    quantity = models.IntegerField(_("quantity"))
    date = models.DateTimeField(_("date"), auto_now=True)

class Reorders(models.Model):
    inventory = models.ForeignKey("app.Inventory", verbose_name=_(
        "inventoty"), on_delete=models.CASCADE)
    quantity = models.IntegerField(_("quantity"))
    status = models.BooleanField(_("status"), default=False)

    
