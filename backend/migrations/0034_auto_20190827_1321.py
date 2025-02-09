# Generated by Django 2.2.4 on 2019-08-27 13:21

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0033_tasknote'),
    ]

    operations = [
        migrations.CreateModel(
            name='ProjectTaskNote',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('note', models.TextField(max_length=750)),
                ('created', models.DateTimeField(auto_now=True)),
                ('modified', models.DateTimeField(auto_now_add=True)),
                ('task', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.ProjectTask')),
            ],
        ),
        migrations.DeleteModel(
            name='TaskNote',
        ),
    ]
