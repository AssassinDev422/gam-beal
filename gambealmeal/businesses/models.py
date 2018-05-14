from django.db import models
from django.db.models import Avg, Count
import django_filepicker
# Create your models here.
class Rating(models.Model):
    user = models.ForeignKey('accounts.CustomUser', on_delete=models.CASCADE)
    business = models.ForeignKey('Business', on_delete=models.CASCADE)
    receipt = models.ForeignKey('offers.Receipt', on_delete=models.CASCADE, default=2, related_name="rating2")
    rating = models.FloatField(default=0.0)
    return_choices = (
        ("YES", "YES"),
        ("NO", "NO"),
        ("MAYBE", "MAYBE"),
        )
    would_return = models.CharField(default="MAYBE", choices = return_choices, max_length=10)
    comments = models.TextField(max_length = 600, default = "")


class Business(models.Model):
    business_name = models.CharField(max_length = 100)
    receipt_rules = models.TextField(max_length = 1200)
    about = models.TextField(max_length = 1200, default = "")
    fun_facts = models.TextField(max_length=1200, default = "")
    featured_img = django_filepicker.models.FPUrlField()
    logo_img = django_filepicker.models.FPUrlField()
    def rating(self):
        objects = Rating.objects.filter(business=self)
        rating = objects.aggregate(Avg('rating'))
        rating['rating__count'] = len(objects)

        # rating = rating['rating__avg']
        # rating = rating if rating is not None else 0.0
        return rating