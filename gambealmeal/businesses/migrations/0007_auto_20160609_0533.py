# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2016-06-09 05:33
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('businesses', '0006_auto_20160609_0531'),
    ]

    operations = [
        migrations.AlterField(
            model_name='rating',
            name='receipt',
            field=models.ForeignKey(default=2, on_delete=django.db.models.deletion.CASCADE, related_name='rating2', to='offers.Receipt'),
        ),
    ]
