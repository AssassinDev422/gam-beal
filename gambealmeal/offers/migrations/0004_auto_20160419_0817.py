# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2016-04-19 08:17
from __future__ import unicode_literals

from django.db import migrations
import django_filepicker.models


class Migration(migrations.Migration):

    dependencies = [
        ('offers', '0003_auto_20160419_0809'),
    ]

    operations = [
        migrations.AlterField(
            model_name='receipt',
            name='receipt_img',
            field=django_filepicker.models.FPUrlField(),
        ),
    ]
