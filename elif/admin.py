# Register your models here.
from django.contrib import admin
from .models import Customer, Shop, Food

class CustomerAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone', 'addres', )

class ShopAdmin(admin.ModelAdmin):
    list_display = ('name', )

class FoodAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'shop', 'image', 'description',)    


admin.site.register(Customer, CustomerAdmin)
admin.site.register(Shop, ShopAdmin)
admin.site.register(Food, FoodAdmin)