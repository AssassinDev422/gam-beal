# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2016-04-19 08:09
from __future__ import unicode_literals

from django.db import migrations
import django_filepicker.models


class Migration(migrations.Migration):

    dependencies = [
        ('businesses', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='business',
            name='featured_img',
            field=django_filepicker.models.FPFileField(upload_to=''),
        ),
        migrations.AlterField(
            model_name='business',
            name='logo_img',
            field=django_filepicker.models.FPFileField(upload_to=''),
        ),
    ]