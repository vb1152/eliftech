from django.db import models

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

