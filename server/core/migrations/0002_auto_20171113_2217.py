# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2017-11-13 22:17
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='GroupInvite',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.CharField(max_length=63)),
                ('first_name', models.CharField(blank=True, max_length=31)),
                ('last_name', models.CharField(blank=True, max_length=31)),
                ('verification_token', models.CharField(max_length=31, unique=True)),
                ('group', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.Group')),
            ],
        ),
        migrations.AlterField(
            model_name='customuser',
            name='groups',
            field=models.ManyToManyField(related_name='members', through='core.Membership', to='core.Group'),
        ),
        migrations.AddField(
            model_name='membership',
            name='invite',
            field=models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.CASCADE, to='core.GroupInvite'),
        ),
        migrations.AlterUniqueTogether(
            name='groupinvite',
            unique_together=set([('email', 'group')]),
        ),
    ]
