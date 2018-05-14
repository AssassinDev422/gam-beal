from django.apps import AppConfig
from watson import search as watson


class OffersConfig(AppConfig):
    name = 'offers'
    verbose_name = "Offers"
    def ready(self):
        Offer = self.get_model("Offer")
        watson.register(Offer, fields=("business__business_name", "offer_type", "status"))
        Receipt = self.get_model("Receipt")
        watson.register(Receipt,fields=("id", "offer__business__business_name","offer__offer_type", "offer__status", "status", "user__email", "user__first_name", "user__last_name", "user__email"))