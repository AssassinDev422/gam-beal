# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2016-07-12 04:19
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('offers', '0011_auto_20160707_0637'),
    ]

    operations = [
        migrations.AddField(
            model_name='offer',
            name='minimum_spend_amount',
            field=models.FloatField(default=10.0),
        ),
    ]