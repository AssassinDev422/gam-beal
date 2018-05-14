from django.db import models
from datetime import datetime
import django_filepicker
from django.core.validators import MaxValueValidator, MinValueValidator
from django.contrib.postgres.fields import JSONField

class Offer(models.Model):
    business = models.ForeignKey('businesses.Business', on_delete=models.CASCADE)

    offer_type_choices = (
        ("variable", "Variable"),
        ("fixed", "Fixed"),
        )

    offer_type = models.CharField(max_length = 50, choices = offer_type_choices, default = "fixed")

    surge = models.BooleanField(default=False)

    surge_start = models.DateTimeField(default = datetime.now)

    surge_end = models.DateTimeField(default = datetime.now)

    surge_multiplier = models.IntegerField(default = 1)

    variable_rewards = JSONField(default = [])

    min_reward = models.FloatField(default = 0.25)

    max_reward = models.FloatField(default = 0.25)

    redeemable_quantity = models.IntegerField(default = 100)

    status_choices = (
        ("active", "Active"),
        ("inactive", "Inactive"),
        )

    status = models.CharField(max_length = 50, choices = status_choices, default = "active")

    display_order = models.FloatField(
        default= 3.0,
        validators = [MinValueValidator(1.0), MaxValueValidator(50.0)]
        )

    featured = models.BooleanField(default=False)
    
    minimum_spend_amount = models.FloatField(default = 10.00)

    details = models.TextField(max_length = 1200, default = "")

class Receipt(models.Model):

    offer = models.ForeignKey(Offer, on_delete=models.CASCADE)

    user = models.ForeignKey('accounts.CustomUser', on_delete=models.CASCADE)

    receipt_img = django_filepicker.models.FPUrlField()

    submit_time = models.DateTimeField(auto_now_add = True)

    status_choices = (
        ("open", "Open"),
        ("approved", "Approved"),
        ("denied", "Denied"),
        )

    status = models.CharField(max_length = 50, choices = status_choices, default = "open")

    rating = models.ForeignKey('businesses.Rating', null = True, blank = True, related_name="rating1")

    money_earned = models.FloatField(default = 0.00)

    class Meta:
        ordering = ['-submit_time']