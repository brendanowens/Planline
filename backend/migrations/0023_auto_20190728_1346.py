# Generated by Django 2.2.3 on 2019-07-28 13:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0022_remove_projecttask_attachments'),
    ]

    operations = [
        migrations.AlterField(
            model_name='projecttask',
            name='vendor_attachments',
            field=models.ManyToManyField(blank=True, null=True, to='backend.Vendor'),
        ),
    ]
