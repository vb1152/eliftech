from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
import json 
from .models import Shop, Food

# Create your views here.

def index(request):
    shops = Shop.objects.all()

    food = Food.objects.filter(shop__id=1)
    print(len(food))
    return render(request, 'elif/index.html', {'shops': shops, 'food': food})

def api_food(request):
    if request.method == 'POST':
        food = Food.objects.filter(shop__id = json.load(request)['id']).values()
        print(food)
        data = {
            'food': list(food),
        }
        return JsonResponse(data)

def cart(request):
    food = Food.objects.filter(shop__id=1)
    return render(request, 'elif/cart.html', {'food': food})