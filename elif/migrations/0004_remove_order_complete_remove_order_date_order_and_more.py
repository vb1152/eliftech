# Generated by Django 4.0.5 on 2022-07-02 21:08

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('elif', '0003_remove_order_customer'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='order',
            name='complete',
        ),
        migrations.RemoveField(
            model_name='order',
            name='date_order',
        ),
        migrations.AddField(
            model_name='order',
            name='customer',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='elif.customer'),
        ),
    ]
