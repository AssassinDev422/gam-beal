from django.db import models
from datetime import datetime 
import time
from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser
)
import django_filepicker
from paypalrestsdk import Payout, ResourceNotFound

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None):
        """
        Creates and saves a User with the given email, date of
        birth and password.
        """
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(
            email=self.normalize_email(email),
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password):
        """
        Creates and saves a superuser with the given email, date of
        birth and password.
        """
        user = self.create_user(email,
            password=password
        )
        user.is_admin = True
        user.save(using=self._db)
        return user


class CustomUser(AbstractBaseUser):
    offers_redeemed = models.IntegerField(default=0)
    lifetime_earnings = models.FloatField(default=0.00)
    date_joined = models.DateField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    
    is_completed = models.BooleanField(default=False, blank = True)
    is_prized = models.BooleanField(default=False, blank = True)
    
    email = models.EmailField(verbose_name='email address', max_length=255, unique=True,)

    # General Information
    first_name = models.CharField(default="", max_length=255)                           # First Name
    last_name = models.CharField(default="", max_length=255)                            # Last Name
    birthdate = models.DateField(default=datetime.now, blank=True)                      # Birthday
    gender = models.IntegerField(default=1, blank=True)                                 # Gender: 1: Male, 2: Female
    country = models.CharField(default="", max_length=100, blank = True)
    city = models.CharField(default="", max_length=100, blank = True)
    zip_code = models.CharField(default="", max_length=50, blank = True)                # ZipCode
    total_annual_income = models.CharField(default="", max_length=100, blank = True)    # Total Annual Income (drop down)
    residence_status = models.CharField(default="", max_length=15, blank = True)        # Residence Status (drop down)
    time_residence_years = models.IntegerField(default=0, blank = True)                 # Time at Residence - Years
    time_residence_months = models.IntegerField(default=0, blank = True)                # Time at Residence - Months
    occupation = models.CharField(default="", max_length=25, blank = True)              # Occupation (drop down)
    education_level = models.CharField(default="", max_length=255, blank = True)        # Education Level (drop down)
    marital_status = models.IntegerField(default=1, blank = True)                       # Marital Status: 1-> Male, 2-> Single
    family_size = models.IntegerField(default=0, blank = True)                          # Family Size
    phone_number = models.CharField(default="", max_length=15, blank = True)            # Primary Phone
    us_citizen =  models.BooleanField(default=False)                                    # Are you a United States Citizen (drop down: Yes | No)

    # Account
    image_url = django_filepicker.models.FPUrlField(blank = True, null = True)
    objects = CustomUserManager()
    paypal = models.CharField(default="", max_length=255, blank = True)
    apns_token = models.CharField(default="", max_length=255, blank = True)
    available_money = models.FloatField(default = 0.00)
    pending_money = models.FloatField(default = 0.00)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def get_full_name(self):
        # The user is identified by their email address
        return self.email

    def get_short_name(self):
        # The user is identified by their email address
        return self.email

    def __str__(self):              # __unicode__ on Python 2
        return self.email

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin

# Create your models here.
class WithdrawRequest(models.Model):
    user = models.ForeignKey(CustomUser, related_name="withdrawals");
    amount = models.FloatField(default=0.0)
    status_choices = (
        ("open", "Open"),
        ("accepted", "Accepted"),
        ("rejected", "Rejected"),
        )
    status = models.CharField(max_length = 50, choices = status_choices, default = "open")
    date = models.DateTimeField(auto_now_add=True)
    paid = models.BooleanField(default=False)
    def execute(self):
        if (self.paid):
            return False
        batch_id = "batch_{0}_{1}".format(str(self.id), str(int(round(time.time(),-1)/10))) 
        payout = Payout({
            "sender_batch_header": {
                "sender_batch_id": batch_id,
                "email_subject": "You have a payment from GambealMeal"
            },
            "items": [
                {
                    "recipient_type": "EMAIL",
                    "amount": {
                        "value": self.amount,
                        "currency": "USD"
                    },
                    "receiver": self.user.paypal,
                    "note": "Thank you.",
                    "sender_item_id": str(self.amount) + " Payout from GambealMeal"
                }
            ]
        })

        if payout.create(sync_mode=True):
            print("payout[%s] created successfully" %
                  (payout.batch_header.payout_batch_id))
            self.paid = True
            self.save()
        else:
            print(payout.error)