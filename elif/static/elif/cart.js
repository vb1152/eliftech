document.addEventListener('DOMContentLoaded', function(){

    var delBtns = document.getElementsByClassName('delete-item')
    for (i = 0; i < delBtns.length; i++) {
        delBtns[i].addEventListener('click', function(){
        console.log('click')
        var productId = this.dataset.product
        var action = this.dataset.action
        deleteFromCart(productId, action, csrftoken)
        })
    }
    document.getElementById('cart-count').value = delBtns.length
    
    calculate_total()

    document.getElementById('submit').addEventListener('click', send_data)


});

function send_data() {
    const containerUserInput = document.getElementById('form')
    var userInputs = containerUserInput.getElementsByTagName('input');
    
    var userDataDict = {}
    for (i=0; i < userInputs.length; ++i) {
        console.log(userInputs[i].value, userInputs[i].id)
        userDataDict[userInputs[i].id] = userInputs[i].value
        
        if (userInputs[i].value.length === 0) {
            alert('Provide data')
        }
    }
    console.log(userDataDict)
    
    const containerOrder = document.getElementById('cards-container');
    inputs = containerOrder.getElementsByTagName('input');
    buttons = containerOrder.getElementsByTagName('button');
    var orderDataDict = {}
    for (i=0; i < inputs.length; ++i) {
        console.log(inputs[i].value, buttons[i].getAttribute('data-product'))
        // parseInt(inputs[i].value) * parseInt(inputs[i].getAttribute('data-price'))
        orderDataDict[buttons[i].getAttribute('data-product')] = inputs[i].value
    }
    console.log(orderDataDict)

    fetch('/place_order', {
        method: 'POST',
        headers: {
        'Content-Type':'application/json',
        'X-CSRFToken': csrftoken
        },
        body: JSON.stringify({'orderDataDict': orderDataDict, 'userDataDict': userDataDict})
    })
    .then((response)=>{         
        if(response.redirected){
            window.location.href = response.url;
        }
    })           
}

function calculate_total(){
    const container = document.getElementById('cards-container');
    inputs = container.getElementsByTagName('input');
    total_data = 0
    for (i=0; i < inputs.length; ++i) {
        total_data = total_data + parseInt(inputs[i].value) * parseInt(inputs[i].getAttribute('data-price'))

        inputs[i].addEventListener('change', function(){
            calculate_total()
        })
    }
    document.getElementById('total').innerHTML = total_data
}

function deleteFromCart(productId, action, csrftoken) {
    var url = '/add_to_cart'

    fetch(url, {
        method: 'POST',
        headers: {
        'Content-Type':'application/json',
        'X-CSRFToken': csrftoken
        },
        body: JSON.stringify({'productId': productId, 'action': action})
    })
    .then(response => response.json())
    .then(data => {
        console.log('New cart:', data.food);

        var card_list = document.getElementById("cards-container");
        while (card_list.firstChild) {
            card_list.removeChild(card_list.firstChild);
              }
        
        document.getElementById('cart-count').value = data.food.length
       
        data.food.forEach(element => {

        var card = document.createElement('div')
        card.setAttribute('class', 'card mb-3')
        card.setAttribute('style', 'max-width: 540px;')

        var row = document.createElement('div')
        row.setAttribute('class', 'row g-0')

        var col1 = document.createElement('div')
        col1.setAttribute('class', 'col')
        
        var img = document.createElement('img')
        img.setAttribute('src', element.image)
        img.setAttribute('class', 'img-fluid rounded-start')
        img.setAttribute('alt', '...')

        var col2 = document.createElement('div')
        col2.setAttribute('class', 'col')
    
        var body = document.createElement('div')
        body.setAttribute('class', 'card-body')

        var title = document.createElement('h5')
        title.setAttribute('class', 'card-title')
        title.innerHTML = element.name

        var price = document.createElement('h5')
        price.innerHTML = 'Ціна: ' + element.price.toString()

        var col3 = document.createElement('div')
        col3.setAttribute('class', 'col col-lg-2')
        col3.setAttribute('id', 'group-number')

        var inp = document.createElement('input')
        inp.setAttribute('type', 'number')
        inp.setAttribute('id', 'number')
        inp.setAttribute('class', 'form-control')
        inp.setAttribute('min', '1')
        inp.setAttribute('value', '1')
        inp.setAttribute('data-price', element.price)

        var btnClose = document.createElement('button')
        btnClose.setAttribute('data-product', element.id)
        btnClose.setAttribute('data-action', 'del')
        btnClose.setAttribute('type', 'button')
        btnClose.setAttribute('class', 'btn-close delete-item')
        btnClose.setAttribute('aria-label', 'Close')
    
        col3.appendChild(inp)
        body.appendChild(title)
        body.appendChild(price)
        col2.appendChild(body)
        col1.appendChild(img)
        row.appendChild(col1)
        row.appendChild(col2)
        row.appendChild(col3)
        row.appendChild(btnClose)
        card.appendChild(row)
        card_list.appendChild(card)
        });

        var delBtns = document.getElementsByClassName('delete-item')
        for (i = 0; i < delBtns.length; i++) {
            delBtns[i].addEventListener('click', function(){
            console.log('click listen_close')
            var productId = this.dataset.product
            var action = this.dataset.action
            deleteFromCart(productId, action, csrftoken)
            })
        }

        calculate_total()
    })
}