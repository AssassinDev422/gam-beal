# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2016-06-04 06:18
from __future__ import unicode_literals

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('offers', '0006_auto_20160521_0727'),
    ]

    operations = [
        migrations.AlterField(
            model_name='offer',
            name='display_order',
            field=models.FloatField(default=1.0, validators=[django.core.validators.MinValueValidator(1.0), django.core.validators.MaxValueValidator(50.0)]),
        ),
    ]
