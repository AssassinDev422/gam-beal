from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import authentication, permissions
from offers.models import *
from accounts.models import *
from django.db.models import Avg, Count, Sum
from datetime import datetime, timedelta, time
from offers.serializers import ReceiptSerializer

def index(request, title='GambealMeal', meta=()):
	context = {
		"title": title,
		"meta_tags": (("og:site_name", "GambealMeal"), ) + meta
	}
	return render(request, 'static/index.html', context)

class FrontPage(APIView):
    """
    View for front page

    * Requires token authentication
    * Requires admin permissions
    * Gets total money earned, new users in past 24 hours, receipts submitted in last 24 hours, receipts pending, and 2 of each of the pending an submitted receipts
    """
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAdminUser,)
    def get(self, request, format=None):
        """
        Return data.
        """
        data = dict()
        time_query = request.GET.get('range')
        time_range = datetime.now() - timedelta(days=1)
        if time_query:
            if time_query == "24":
                time_range = datetime.now() - timedelta(days=1)
            elif time_query == "72":
                time_range = datetime.now() - timedelta(days=3)
            elif time_query == "1wk":
                time_range = datetime.now() - timedelta(days=7)
            elif time_query == "1mo":
                time_range = datetime.now() - timedelta(days=31)
            elif time_query == "3mo":
                time_range = datetime.now() - timedelta(days=93)
            elif time_query == "inf":
                time_range = None

        if time_range is not None:
            data['new_users'] = len(CustomUser.objects.filter(date_joined__gte=datetime.combine(time_range, time.min)))
            data['receipts_submitted'] = len(Receipt.objects.filter(submit_time__gte=datetime.combine(time_range, time.min)))
            data['money_earned'] = Receipt.objects.filter(status="approved", submit_time__gte=datetime.combine(time_range, time.min)).aggregate(Sum('money_earned'))['money_earned__sum'] or 0
        else:
            data['new_users'] = len(CustomUser.objects.all())
            data['receipts_submitted'] = len(Receipt.objects.all())
            data['money_earned'] = Receipt.objects.filter(status="approved").aggregate(Sum('money_earned'))['money_earned__sum']
        data['receipts_pending'] = len(Receipt.objects.filter(status="open"))
        data['receipts_recent_pending'] = ReceiptSerializer(Receipt.objects.filter(status="open").order_by('-submit_time')[:10], many=True).data

        return Response(data)