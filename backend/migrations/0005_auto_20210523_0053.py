# Generated by Django 3.1 on 2021-05-23 00:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0004_auto_20210522_2330'),
    ]

    operations = [
        migrations.AlterField(
            model_name='torneo',
            name='imagen',
            field=models.ImageField(blank=True, null=True, upload_to='torneos'),
        ),
    ]