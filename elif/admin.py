# Register your models here.
from django.contrib import admin
from .models import Customer, Shop, Food, Order, OrderItem

class CustomerAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone', 'addres', )

class ShopAdmin(admin.ModelAdmin):
    list_display = ('name',)

class FoodAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'shop', 'image', 'description',)
    
class OrderAdmin(admin.ModelAdmin):
    list_display = ('customer',)

class OrderItemAdmin(admin.ModelAdmin):
    list_display = ('food', 'order', 'quantity',)


admin.site.register(Customer, CustomerAdmin)
admin.site.register(Shop, ShopAdmin)
admin.site.register(Food, FoodAdmin)
admin.site.register(Order, OrderAdmin)
admin.site.register(OrderItem, OrderItemAdmin)

