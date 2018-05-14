# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2016-04-19 08:00
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django_filepicker.models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('offers', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Receipt',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('receipt_img', django_filepicker.models.FPUrlField()),
                ('submit_time', models.DateTimeField(auto_now_add=True)),
                ('status', models.CharField(choices=[('open', 'Open'), ('approved', 'Approved'), ('denied', 'Denied')], default='open', max_length=50)),
                ('offer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='offers.Offer')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
