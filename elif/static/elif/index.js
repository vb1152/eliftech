document.addEventListener('DOMContentLoaded', function(){
    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    const wrapper = document.getElementById('buttons');

    wrapper.addEventListener('click', (event) => {
      const isButton = event.target.nodeName === 'BUTTON';
      if (!isButton) {
        return;
      }
      console.log(isButton, event.target.id)
      
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
        console.log('Success:', data.food);
        
        var card_list = document.getElementById("cards-container");
        while (card_list.firstChild) {
          card_list.removeChild(card_list.firstChild);
            }
        
        data.food.forEach(element => {
          console.log(element)

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

          var abtn = document.createElement('a')
          abtn.setAttribute('href', "#")
          abtn.setAttribute('class', 'btn btn-outline-success')
          abtn.innerHTML = 'До кошика'

          var price = document.createElement('h5')
          price.innerHTML = 'Ціна ' + element.price

          cardBody.appendChild(header)
          cardBody.appendChild(descr)
          cardBody.appendChild(price)
          cardBody.appendChild(abtn)

          card.appendChild(img)
          card.appendChild(cardBody)

          card_list.appendChild(card)
        })


      })
      .catch((error) => {
        console.error('Error:', error);
      });
      
    
    })
});