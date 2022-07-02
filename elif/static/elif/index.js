document.addEventListener('DOMContentLoaded', function(){
  
    const itemInCart = document.getElementById('cart-count')
    const wrapper = document.getElementById('buttons');

    wrapper.addEventListener('click', (event) => {
        const isButton = event.target.nodeName === 'BUTTON';
        if (!isButton) {
            return;
        }

        const data = { 'id': event.target.id };

        fetch('/api_food', {
            method: 'POST', // or 'PUT'
            headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            var card_list = document.getElementById("cards-container");
            while (card_list.firstChild) {
                card_list.removeChild(card_list.firstChild);
                }

            data.food.forEach(element => {
                //console.log(element)

                var card = document.createElement('div');
                card.setAttribute('class', 'card')
                card.setAttribute('style', 'width: 18rem;')

                var img = document.createElement('img');
                img.setAttribute('src', element.image)
                img.setAttribute('class', 'card-img-top')
                img.setAttribute('alt', "...")
                
                var cardBody = document.createElement('div')
                cardBody.setAttribute('class', 'card-body')

                var header = document.createElement('h4')
                header.setAttribute('class', 'card-title')
                header.innerHTML = element.name
                var descr = document.createElement('p')
                descr.setAttribute('class', 'card-text')
                descr.innerHTML = element.description

                var abtn = document.createElement('button')
                abtn.setAttribute('data-product', element.id)
                abtn.setAttribute('data-action', 'add')
                abtn.setAttribute('href', '#')
                abtn.setAttribute('class', 'btn btn-outline-success update-cart')
                abtn.innerHTML = 'До кошика'

                // <button data-product="4" data-action="add" href="#" class="btn btn-outline-success update-cart">До кошика</button>
                // <button data-product="7" data-action="add" href="#" class="btn btn-outline-success update-cart">До кошика</button>


                var price = document.createElement('h5')
                price.innerHTML = 'Ціна ' + element.price

                cardBody.appendChild(header)
                cardBody.appendChild(descr)
                cardBody.appendChild(price)
                cardBody.appendChild(abtn)

                card.appendChild(img)
                card.appendChild(cardBody)

                card_list.appendChild(card)
            });

            var cartBtns = document.getElementsByClassName('update-cart')
            for (i = 0; i < cartBtns.length; i++) {
                console.log('update-cart wraper')
                console.log(cartBtns[i])
                cartBtns[i].addEventListener('click', function(){
                var productId = this.dataset.product
                var action = this.dataset.action
                console.log('productId', productId, 'action', action)
            
                updateOrder(productId, action)
                })
            };
        })
    
    });

    var cartBtns = document.getElementsByClassName('update-cart')
    for (i = 0; i < cartBtns.length; i++) {
    console.log('update-cart Success')
    cartBtns[i].addEventListener('click', function(){
        var productId = this.dataset.product
        var action = this.dataset.action
        console.log('productId', productId, 'action', action)

        updateOrder(productId, action)
        })
    }


});

function set_event_listener() {
  var cartBtns = document.getElementsByClassName('update-cart')
  for (i = 0; i < cartBtns.length; i++) {
    console.log('update-cart function')
    cartBtns[i].addEventListener('click', function(){
      var productId = this.dataset.product
      var action = this.dataset.action
      console.log('productId', productId, 'action', action)
 
      updateOrder(productId, action)
    })
  }

}

function updateOrder(productId, action){
    var cart_item = document.getElementById('cart-count')
    count = cart_item.value
    cart = parseInt(count)
    cart_item.setAttribute('value', cart + 1)
    
    // itemInCart.getAttribute('placeholder')
    // console.log(itemInCart.getAttribute('placeholder'))

    var url = '/add_to_cart'

    fetch(url, {
        method: 'POST',
        headers: {
        'Content-Type':'application/json',
        'X-CSRFToken': csrftoken
        },
        body: JSON.stringify({'productId': productId, 'action': action})
    })

    // .then(response => response.json())
    // // .then(data => {
    //   console.log('Success:', data.food);
    // })
};
