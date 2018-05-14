from django.apps import AppConfig
from watson import search as watson

class BusinessesConfig(AppConfig):
    name = 'businesses'
    verbose_name = "Businesses"
    def ready(self):
        Business = self.get_model("Business")
        Rating = self.get_model("Rating")
        watson.register(Business)
        watson.register(Rating, fields=("id", "business__business_name", "user__email", "user__paypal", "user__first_name", "user__last_name"))