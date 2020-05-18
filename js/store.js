if (document.readyState == 'loading')
    document.addEventListener('DOMContentLoaded', ready);
    // document.addEventListener('readystatechange', ready);
else
    ready();

// function ready() {
//     var addToCartButtons = document.getElementsByClassName('shop-item-button');
//     for (let i = 0; i < addToCartButtons.length; i++) {
//         addToCartButtons[i].addEventListener('click', addToCartButtonClicked);
//     } // loop cart buttons

//     var cartRemoveButtons = document.getElementsByClassName('btn-danger');
//     for (let i = 0; i < cartRemoveButtons.length; i++) {
//         cartRemoveButtons[i].addEventListener('click', removeCartItemClicked);
//     } // loop buttons

//     var cartQuantityInputs = document.getElementsByClassName('cart-quantity-input');
//     for (let i = 0; i < cartQuantityInputs.length; i++) {
//         const input = cartQuantityInputs[i];

//         // input.setAttribute('min', 1);
//         // input.addEventListener('change', quantityChanged);
//         input.addEventListener('input', quantityChanged);
//     } // loop quantities

//     var btnPurchase = document.getElementsByClassName('btn-purchase')[0];
//     btnPurchase.addEventListener('click', purchaseButtonClicked);
// } // ready

function addToCartButtonClicked(event) {
    var btnAdd = event.target;
    var shopItem = btnAdd.parentElement.parentElement;

    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText;
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src;
    // var srcImage = shopItem.getElementsByClassName('shop-item-image')[0].getAttribute('src');

    addItemToCart(title, price, imageSrc);
    updateCartTotal();
} // addToCartButtonClicked

function removeCartItemClicked(event) {
    var row = event.target.parentElement.parentElement;
    row.remove();
    
    updateCartTotal();
} // removeCartItem

function quantityChanged(event) {
    var input = event.target;

    if (isNaN(input.value) || input.value <= 0)
        input.value = 1;

    updateCartTotal();
} // quantityChanged

function purchaseButtonClicked(event) {
    var cart = document.getElementsByClassName('cart-items')[0];

    if (!cart.children.length) return;

    alert('Thank you for purchasing from our site!');

    while(cart.hasChildNodes())
        cart.removeChild(cart.firstChild);

    updateCartTotal();
} // purchaseButtonClicked

function addItemToCart(title, price, imageSrc) {
    var cart = document.getElementsByClassName('cart-items')[0];

    var cartItemNames = cart.getElementsByClassName('cart-item-title');
    for (let i = 0; i < cartItemNames.length; i++) {
        const cartItemName = cartItemNames[i];
        if (cartItemName.innerText == title) {
            // alert('Item already added to cart!');
            cartItemName.parentElement.parentElement.getElementsByClassName('cart-quantity-input')[0].value++;
            return;
        }
    }

    var itemInnerHTML = `<div class="cart-item cart-column">
        <img src="${imageSrc}" class="cart-item-image">
        <span class="cart-item-title">${title}</span>
    </div>
    <span class="cart-price cart-column">${price}</span>
    <div class="cart-quantity cart-column">
        <input type="number" value="1" class="cart-quantity-input">
        <button role="button" class="btn btn-danger">Remove</button>
    </div>`;

    var item = document.createElement('div');
    item.classList.add('cart-row');
    item.innerHTML = itemInnerHTML;

    cart.appendChild(item);
    ready();
} // addItemToCart 

function updateCartTotal() {
    var cart = document.getElementsByClassName('cart-items')[0];
    var rows = cart.getElementsByClassName('cart-row');

    var total = 0;
    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        
        var price = row.getElementsByClassName('cart-price')[0].innerText;
        price = parseFloat(price.replace('$', ''));
        var quantity = row.getElementsByClassName('cart-quantity-input')[0].value;

        total += price * quantity;
    } // loop cart rows

    // total = total.toFixed(2);
    total = Math.round(total*100)/100;
    var totalElement = document.getElementsByClassName('cart-total-price')[0];
    totalElement.innerText = '$' + total;
} // updateCartTotal



///////////////////////////////////
// Alternative events attchement //
///////////////////////////////////

function attachEventListeners(className, eventName, eventListener) {
    var elements = document.getElementsByClassName(className);

    for (let i = 0; i < elements.length; i++) {
        attachEventListener(elements[i], eventName, eventListener);
        // elements[i].addEventListener(eventName, eventListener);
    }
}

function attachEventListener(element, eventName, eventListener) {
    element.addEventListener(eventName, eventListener);
}

function ready() {

    attachEventListeners('shop-item-button', 'click', addToCartButtonClicked);

    attachEventListeners('btn-danger', 'click', removeCartItemClicked);

    attachEventListeners('cart-quantity-input', 'input', quantityChanged);

    attachEventListener(
        document.getElementsByClassName('btn-purchase')[0],
        'click',
        purchaseButtonClicked);
} // ready