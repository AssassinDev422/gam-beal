from rest_framework.exceptions import ValidationError
from rest_framework.validators import UniqueValidator

class LessThanFiveTrue(UniqueValidator):

    def filter_queryset(self, queryset):
        filter_kwargs = {self.field_name: True}
        return queryset.filter(**filter_kwargs)

    def __call__(self, value):
        if value:
            queryset = self.queryset
            queryset = self.filter_queryset(queryset)
            queryset = self.exclude_current_instance(queryset)
            if len(queryset)>4:
                raise ValidationError("You can only feature up to 5 deals at a time")