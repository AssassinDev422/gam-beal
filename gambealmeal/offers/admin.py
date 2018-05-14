from django.contrib import admin
from .models import Offer, Receipt

from django_filepicker.models import FPFileField, FPUrlField
from django_filepicker.widgets import FPFileWidget

class ReceiptAdmin(admin.ModelAdmin):
    model = Receipt
    formfield_overrides = {
    FPUrlField: {'widget': FPFileWidget},
    }

class OfferAdmin(admin.ModelAdmin):
    model = Offer
    
admin.site.register(Receipt, ReceiptAdmin)
admin.site.register(Offer, OfferAdmin)