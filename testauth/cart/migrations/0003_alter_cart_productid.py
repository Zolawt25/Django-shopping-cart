# Generated by Django 4.2.11 on 2024-04-17 09:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("cart", "0002_cart_productid"),
    ]

    operations = [
        migrations.AlterField(
            model_name="cart",
            name="productId",
            field=models.IntegerField(),
        ),
    ]
