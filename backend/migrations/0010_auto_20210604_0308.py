# Generated by Django 3.1 on 2021-06-04 03:08

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0009_gol_jornada_juego'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='jornada',
            options={'ordering': ['-nombre']},
        ),
    ]
