from email.policy import default
from pyexpat import model
from django.db import models
from django.forms import BooleanField

# Create your models here.
class Customer(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    addres = models.CharField(max_length=100)

    class Meta:
        ordering = ["name"]
        verbose_name_plural = "Покупець"
        verbose_name_plural = "Покупці"

    def __str__(self):
        return self.name

class Shop(models.Model):
    name = models.CharField(max_length=100)

    class Meta:
        ordering = ["name"]
        verbose_name_plural = "Магазин"
        verbose_name_plural = "Магазини"
    
    def __str__(self):
        return self.name


class Food(models.Model):
    name = models.CharField(max_length=100)
    price = models.PositiveSmallIntegerField()
    shop = models.ForeignKey(Shop, on_delete=models.CASCADE, related_name='food_rel')
    image = models.CharField(max_length=500, blank=True, null=True)
    description = models.CharField(max_length=1000, blank=True, null=True)

    class Meta:
        ordering = ["name"]
        verbose_name_plural = "Їжа"
        verbose_name_plural = "Їжа"
        
    def __str__(self):
        return self.name

class Order(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self) -> str:
        return str(self.id)
        
class OrderItem(models.Model):
    food = models.ForeignKey(Food, on_delete=models.CASCADE, blank=True, null=True)
    order = models.ForeignKey(Order, on_delete=models.CASCADE, blank=True, null=True)
    quantity = models.PositiveSmallIntegerField(default=0)

    def __str__(self) -> str:
        return str(self.id)