# -*- coding: utf-8 -*-
# Generated by Django 1.10.7 on 2018-05-22 01:30
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0015_auto_20180521_2339'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='session',
            unique_together=set([('user', 'session_config')]),
        ),
    ]
