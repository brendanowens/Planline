# Generated by Django 2.2.3 on 2019-07-27 13:36

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0021_auto_20190727_1334'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='projecttask',
            name='attachments',
        ),
    ]
