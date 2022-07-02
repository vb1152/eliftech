from django.http import JsonResponse
from django.shortcuts import render, redirect
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


def add_to_cart(request):
    if request.method == 'POST':
        
        data = json.load(request)
        product_id = data['productId']
        action = data['action']

        if 'cart' in request.session and action == 'add':
            session_cart = request.session['cart']
            session_cart.append(product_id)
            request.session['cart'] = session_cart

        elif 'cart' in request.session and action == 'del':
            session_cart = request.session['cart']
            session_cart.remove(product_id)
            request.session['cart'] = session_cart

            food = Food.objects.filter(id__in=request.session['cart']).values()
            data = {'food': list(food),}
            return JsonResponse(data, safe=False)
            
        else:
            request.session['cart'] = [product_id]
            food = Food.objects.filter(id__in=request.session['cart']).values()
            data = {'food': list(food),}
            return JsonResponse(data, safe=False)

        return JsonResponse(200, safe=False)


def end(request):
    return render(request, 'elif/end.html')

def place_order(request):
    if request.method == 'POST':
        data = json.load(request)
        order = data['orderDataDict']
        user_data = data['userDataDict']

        customer = Customer(name=user_data['inputname'], 
                            email=user_data['inputemail'], 
                            phone=user_data['inputphone'], 
                            addres=user_data['inputaddress'])
        customer.save()
        
        order_instance = Order(customer=customer)
        order_instance.save()

        for i in order:
            food = Food.objects.get(id=i)
            order_item = OrderItem(food=food, 
                                    order=order_instance, 
                                    quantity=order[i])
            order_item.save()

        return redirect(reverse('elif:end'))

