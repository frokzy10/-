let listCart = [];
function checkCart() {
    const cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('listCart='));
    if (cookieValue) {
        listCart = JSON.parse(cookieValue.split('=')[1]);
    }
}
checkCart();
addCartToHTML();
function addCartToHTML() {
    // очистка
    let listCartHTML = document.querySelector('.returnCart .list');
    listCartHTML.innerHTML = '';

    let totalQuantityHTML = document.querySelector('.totalQuantity');
    let totalPriceHTML = document.querySelector('.totalPrice');
    let totalQuantity = 0;
    let totalPrice = 0;
    // если есть товар в корзинке
    if (listCart) {
        listCart.forEach(el => {
            if (el) {
                let newCart = document.createElement('div');
                newCart.classList.add('item');
                newCart.innerHTML =
                    `<img src="${el.img}" alt="">
                    <div class="info">
                        <div class="name">${el.name}</div>
                        <div class="price">$${el.price}/1 el</div>
                    </div>
                    <div class="quantity">${el.quantity}</div>
                    <div class="returnPrice">$${el.price * el.quantity}</div>`;
                listCartHTML.appendChild(newCart);
                totalQuantity = totalQuantity + el.quantity;
                totalPrice = totalPrice + (el.price * el.quantity);
            }
        })
    }
    totalQuantityHTML.innerText = totalQuantity;
    totalPriceHTML.innerText = '$' + Math.round(totalPrice);
}
