# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2016-06-17 02:16
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('businesses', '0007_auto_20160609_0533'),
    ]

    operations = [
        migrations.AlterField(
            model_name='rating',
            name='would_return',
            field=models.CharField(choices=[('YES', 'YES'), ('NO', 'NO'), ('MAYBE', 'MAYBE')], default='MAYBE', max_length=10),
        ),
    ]
