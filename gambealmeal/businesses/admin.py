from django.contrib import admin
from .models import Business
from django_filepicker.models import FPFileField, FPUrlField
from django_filepicker.widgets import FPFileWidget

class BusinessAdmin(admin.ModelAdmin):
    model = Business
    formfield_overrides = {
    FPUrlField: {'widget': FPFileWidget},
    }
    
admin.site.register(Business, BusinessAdmin)
# Register your models here.
