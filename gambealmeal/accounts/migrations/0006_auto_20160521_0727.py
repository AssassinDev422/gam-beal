# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2016-05-21 07:27
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0005_auto_20160518_2042'),
    ]

    operations = [
        migrations.CreateModel(
            name='WithdrawRequest',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amount', models.FloatField(default=0.0)),
                ('status', models.CharField(choices=[('open', 'Open'), ('accepted', 'Accepted'), ('rejected', 'Rejected')], default='open', max_length=50)),
                ('date', models.DateField(auto_now_add=True)),
            ],
        ),
        migrations.AddField(
            model_name='customuser',
            name='paypal',
            field=models.CharField(default='', max_length=255),
        ),
        migrations.AddField(
            model_name='withdrawrequest',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]