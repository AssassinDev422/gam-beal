# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2016-04-27 19:28
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('offers', '0004_auto_20160419_0817'),
    ]

    operations = [
        migrations.AddField(
            model_name='offer',
            name='featured',
            field=models.BooleanField(default=True),
        ),
    ]