# Generated by Django 2.2.3 on 2019-07-26 22:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0019_projecttemplate_templatetask'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='note',
            field=models.TextField(blank=True, max_length=500, null=True),
        ),
    ]
