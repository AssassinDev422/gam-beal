# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2016-04-25 17:52
from __future__ import unicode_literals

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_auto_20160408_0016'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='birthdate',
            field=models.DateField(blank=True, default=datetime.datetime.now),
        ),
        migrations.AddField(
            model_name='customuser',
            name='phone_number',
            field=models.CharField(default='', max_length=15),
        ),
    ]
