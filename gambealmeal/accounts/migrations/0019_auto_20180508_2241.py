# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2018-05-08 19:41
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0018_customuser_is_prized'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='customuser',
            name='apt_suite_bldg',
        ),
        migrations.RemoveField(
            model_name='customuser',
            name='city',
        ),
        migrations.RemoveField(
            model_name='customuser',
            name='country',
        ),
        migrations.RemoveField(
            model_name='customuser',
            name='middle_name',
        ),
        migrations.RemoveField(
            model_name='customuser',
            name='permanent_address',
        ),
        migrations.RemoveField(
            model_name='customuser',
            name='permanent_address_months',
        ),
        migrations.RemoveField(
            model_name='customuser',
            name='permanent_address_years',
        ),
        migrations.RemoveField(
            model_name='customuser',
            name='suffix',
        ),
        migrations.RemoveField(
            model_name='customuser',
            name='work_phone',
        ),
        migrations.AddField(
            model_name='customuser',
            name='education_level',
            field=models.CharField(blank=True, default='', max_length=255),
        ),
        migrations.AddField(
            model_name='customuser',
            name='family_size',
            field=models.IntegerField(blank=True, default=0),
        ),
        migrations.AddField(
            model_name='customuser',
            name='gender',
            field=models.IntegerField(blank=True, default=1),
        ),
        migrations.AddField(
            model_name='customuser',
            name='marital_status',
            field=models.IntegerField(blank=True, default=1),
        ),
        migrations.AddField(
            model_name='customuser',
            name='time_residence_months',
            field=models.IntegerField(blank=True, default=0),
        ),
        migrations.AddField(
            model_name='customuser',
            name='time_residence_years',
            field=models.IntegerField(blank=True, default=0),
        ),
        migrations.AlterField(
            model_name='customuser',
            name='total_annual_income',
            field=models.IntegerField(blank=True, default=0),
        ),
    ]
