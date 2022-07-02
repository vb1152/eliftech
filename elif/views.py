from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import render
import json 
from .models import Shop, Food, Order, OrderItem, Customer
from django.urls import reverse

# Create your views here.

def index(request):
    if 'cart' in request.session:
        del request.session['cart']
    
    shops = Shop.objects.all()
    food = Food.objects.filter(shop__id=1)
    return render(request, 'elif/index.html', {'shops': shops, 'food': food})

def api_food(request):
    if request.method == 'POST':
        food = Food.objects.filter(shop__id = json.load(request)['id']).values()
        data = {
            'food': list(food),
        }
        return JsonResponse(data, safe=False)

def cart(request):
    if 'cart' in request.session:
        food = Food.objects.filter(id__in=request.session['cart'])
        return render(request, 'elif/cart.html', {'food': food})
    else:
        return render(request, 'elif/cart.html')
            

def create_order(request):
    if request.method == 'POST':
        pass

def add_to_cart(request):
    if request.method == 'POST':
        
        data = json.load(request)
        product_id = data['productId']
        action = data['action']

        if 'cart' in request.session and action == 'add':
            print('if')
            
            session_cart = request.session['cart']
            session_cart.append(product_id)
            request.session['cart'] = session_cart
            print(request.session['cart'])


        elif 'cart' in request.session and action == 'del':
            print('elif')
            session_cart = request.session['cart']
            session_cart.remove(product_id)
            request.session['cart'] = session_cart

            print(request.session['cart'])

            food = Food.objects.filter(id__in=request.session['cart']).values()
            data = {'food': list(food),}
            return JsonResponse(data, safe=False)
            
        else:
            print('else')
            request.session['cart'] = [product_id]
            print(request.session['cart'])
            food = Food.objects.filter(id__in=request.session['cart']).values()
            data = {'food': list(food),}
            return JsonResponse(data, safe=False)

        return JsonResponse(200, safe=False)