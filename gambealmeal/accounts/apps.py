from django.apps import AppConfig
from watson import search as watson

class AccountsConfig(AppConfig):
    name = 'accounts'
    verbose_name = "Accounts"
    def ready(self):
        User = self.get_model("CustomUser")
        watson.register(User, fields=("email", "paypal", "first_name", "last_name"))
        WithdrawRequest = self.get_model("WithdrawRequest")
        watson.register(WithdrawRequest, fields=("id", "user__email", "user__paypal", "user__first_name", "user__last_name", "amount", "paid", "status"))