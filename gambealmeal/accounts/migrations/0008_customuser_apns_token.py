# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2016-06-03 03:35
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0007_withdrawrequest_paid'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='apns_token',
            field=models.CharField(default='', max_length=255),
        ),
    ]
