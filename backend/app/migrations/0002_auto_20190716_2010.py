# Generated by Django 2.2.3 on 2019-07-16 17:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='reorders',
            name='status',
            field=models.BooleanField(default=False, verbose_name='status'),
        ),
    ]
