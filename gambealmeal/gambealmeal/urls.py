from django.conf.urls import include, url
from django.contrib import admin
from django.contrib.admin.views.decorators import staff_member_required
from django.views.decorators.cache import never_cache

from static import views

urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url(r'^api/auth/', include('djoser.urls.authtoken')),
    url(r'^api/', include('accounts.urls', namespace='accounts')),   
    url(r'^api/', include('offers.urls', namespace='offers')),   
    url(r'^api/', include('businesses.urls', namespace='businesses')),
    url(r'^api/', include('notifications.urls', namespace='notifications')),  
    url(r'^docs/', include('rest_framework_swagger.urls')),
    url(r'^api/analytics/', views.FrontPage.as_view(), name='analytics'),
    url(r'^.*$', views.index, name='index'),
]
