# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2016-08-18 00:59
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('businesses', '0009_auto_20160730_1834'),
    ]

    operations = [
        migrations.AddField(
            model_name='business',
            name='about',
            field=models.TextField(default='', max_length=1200),
        ),
        migrations.AddField(
            model_name='business',
            name='fun_facts',
            field=models.TextField(default='', max_length=1200),
        ),
    ]
