# -*- coding: utf-8 -*-
# Generated by Django 1.10.7 on 2018-07-10 00:38
from __future__ import unicode_literals

import core.models
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0008_alter_user_username_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='CustomUser',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('email', models.EmailField(db_index=True, max_length=255, unique=True, verbose_name='email address')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('username', models.CharField(blank=True, max_length=31)),
                ('first_name', models.CharField(blank=True, max_length=31)),
                ('last_name', models.CharField(blank=True, max_length=31)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('updated_at', core.models.AutoDateTimeField(default=django.utils.timezone.now)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Block',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('started_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('finished_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('block_status', models.CharField(blank=True, max_length=31)),
            ],
        ),
        migrations.CreateModel(
            name='BlockConfig',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=31)),
                ('description', models.CharField(max_length=180)),
                ('clocktime', models.DateTimeField(default=django.utils.timezone.now)),
                ('charge_status', models.DecimalField(blank=True, decimal_places=5, max_digits=30)),
                ('charge_distance', models.DecimalField(blank=True, decimal_places=5, max_digits=30)),
                ('charge_capacity', models.DecimalField(blank=True, decimal_places=5, max_digits=30)),
                ('energy_price', models.DecimalField(blank=True, decimal_places=5, max_digits=30)),
                ('power_price', models.DecimalField(blank=True, decimal_places=5, max_digits=30)),
                ('representation_current_state', models.CharField(blank=True, max_length=31)),
                ('flexibility_time_request', models.DecimalField(blank=True, decimal_places=5, max_digits=30)),
                ('default_charge_level', models.DecimalField(blank=True, decimal_places=5, max_digits=30)),
                ('time_to_full_charge', models.DecimalField(blank=True, decimal_places=5, max_digits=30)),
                ('minimum_charge_level', models.DecimalField(blank=True, decimal_places=5, max_digits=30)),
                ('representation_target_state', models.CharField(blank=True, max_length=31)),
                ('flexibility_time_provision', models.DecimalField(blank=True, decimal_places=5, max_digits=30)),
                ('saved_emissions', models.DecimalField(blank=True, decimal_places=5, max_digits=30)),
                ('avoided_environmental_costs', models.DecimalField(blank=True, decimal_places=5, max_digits=30)),
                ('avoided_energy_costs', models.DecimalField(blank=True, decimal_places=5, max_digits=30)),
                ('penalty_probability', models.DecimalField(blank=True, decimal_places=5, max_digits=30)),
                ('penalty_amount', models.DecimalField(blank=True, decimal_places=5, max_digits=30)),
            ],
        ),
        migrations.CreateModel(
            name='ContextConfig',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30)),
                ('description', models.CharField(max_length=180)),
                ('heading', models.CharField(max_length=30)),
                ('text', models.CharField(max_length=400)),
                ('context_type', models.CharField(max_length=30)),
            ],
        ),
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('event', models.CharField(max_length=50)),
                ('screen', models.CharField(max_length=50)),
                ('time_stamp', models.DateTimeField(default=django.utils.timezone.now)),
                ('provided_flexibility_time', models.DecimalField(blank=True, decimal_places=5, max_digits=30)),
                ('target_charging_level', models.DecimalField(blank=True, decimal_places=5, max_digits=30)),
                ('target_minimum_charging_level', models.DecimalField(blank=True, decimal_places=5, max_digits=30)),
                ('charging_level_representation', models.CharField(max_length=50)),
                ('block', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.Block')),
            ],
        ),
        migrations.CreateModel(
            name='Experiment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('started_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('finished_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('number_of_participants', models.PositiveSmallIntegerField(null=True)),
            ],
        ),
        migrations.CreateModel(
            name='FeedbackConfig',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30)),
                ('description', models.CharField(max_length=180)),
                ('heading', models.CharField(max_length=30)),
                ('text', models.CharField(max_length=400)),
                ('feedback_type', models.CharField(max_length=30)),
            ],
        ),
        migrations.CreateModel(
            name='NudgeDynamic',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30)),
                ('description', models.CharField(max_length=180)),
                ('heading', models.CharField(max_length=30)),
                ('text', models.CharField(max_length=200)),
                ('image', models.CharField(max_length=30)),
                ('nudge_type', models.CharField(max_length=30)),
            ],
        ),
        migrations.CreateModel(
            name='NudgeStatic',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30)),
                ('description', models.CharField(max_length=180)),
                ('heading', models.CharField(max_length=30)),
                ('text', models.CharField(max_length=200)),
                ('image', models.CharField(max_length=30)),
                ('nudge_type', models.CharField(max_length=30)),
            ],
        ),
        migrations.CreateModel(
            name='Session',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('started_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('finished_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('session_status', models.CharField(blank=True, max_length=31)),
            ],
        ),
        migrations.CreateModel(
            name='SessionBlockConfig',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('block_config', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.BlockConfig')),
            ],
        ),
        migrations.CreateModel(
            name='SessionConfig',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=31)),
                ('description', models.CharField(max_length=180)),
                ('number_of_sessions', models.PositiveSmallIntegerField(blank=True)),
                ('survey_link', models.CharField(max_length=50)),
                ('session_config_status', models.CharField(default='active', max_length=31)),
            ],
        ),
        migrations.AddField(
            model_name='sessionblockconfig',
            name='session_config',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.SessionConfig'),
        ),
        migrations.AddField(
            model_name='session',
            name='session_config',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.SessionConfig'),
        ),
        migrations.AddField(
            model_name='session',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='event',
            name='session',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.Session'),
        ),
        migrations.AddField(
            model_name='event',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='blockconfig',
            name='context',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.ContextConfig'),
        ),
        migrations.AddField(
            model_name='blockconfig',
            name='feedback',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.FeedbackConfig'),
        ),
        migrations.AddField(
            model_name='blockconfig',
            name='nudge_dynamic',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.NudgeDynamic'),
        ),
        migrations.AddField(
            model_name='blockconfig',
            name='nudge_static',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.NudgeStatic'),
        ),
        migrations.AddField(
            model_name='block',
            name='block_config',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.BlockConfig'),
        ),
        migrations.AddField(
            model_name='block',
            name='session',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.Session'),
        ),
        migrations.AddField(
            model_name='block',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterUniqueTogether(
            name='sessionblockconfig',
            unique_together=set([('session_config', 'block_config')]),
        ),
        migrations.AlterUniqueTogether(
            name='session',
            unique_together=set([('user', 'session_config')]),
        ),
        migrations.AlterUniqueTogether(
            name='block',
            unique_together=set([('session', 'block_config')]),
        ),
    ]
