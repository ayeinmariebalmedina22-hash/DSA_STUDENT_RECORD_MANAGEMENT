const iconCart = document.querySelector('.icon-cart');
const closeCart = document.querySelector('.close');
const body = document.querySelector('body');
const ladsmerchsHTML = document.querySelector('.ladsmerchs');
const listCartHTML = document.querySelector('.listCart'); 
const iconCartSpan = document.querySelector('.icon-cart span');
const checkOutBtn = document.querySelector('.checkout'); 
const totalAmountSpan = document.querySelector('.totalAmountArea span');

let cart = []; 

iconCart.addEventListener('click', () => {
    body.classList.add('showCart');
});

closeCart.addEventListener('click', () => {
    body.classList.remove('showCart');
});

const initApp = () => {
    if (!ladsmerchsHTML) return;
    ladsmerchsHTML.innerHTML = '';

    if (typeof ladsmerchs !== 'undefined' && ladsmerchs.length > 0) {
        ladsmerchs.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.classList.add('item');
            newProduct.innerHTML = `
                <div>
                    <img src="${product.image}" alt="${product.productName}">
                    <h2>${product.productName}</h2>
                    <div class="price">$${product.price}</div>
                </div>
                <button class="addCart" onclick="addToCart(${product.id})">
                    Add To Cart
                </button>
            `;
            ladsmerchsHTML.appendChild(newProduct);
        });
    }

    addCartToHTML(); 
};

const addToCart = (product_id) => {
    let positionThisProductInCart = cart.findIndex((value) => value.product_id == product_id);
    
    if (cart.length <= 0 || positionThisProductInCart < 0) {
        cart.push({
            product_id: product_id,
            quantity: 1
        });
    } else {
        cart[positionThisProductInCart].quantity = cart[positionThisProductInCart].quantity + 1;
    }
    addCartToHTML();
};

const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    let grandTotal = 0;

    if (cart.length > 0) {
        cart.forEach(item => {
            let info = ladsmerchs.find((value) => value.id == item.product_id);
            if (info) {
                totalQuantity = totalQuantity + item.quantity;
                grandTotal = grandTotal + (info.price * item.quantity);

                let newItem = document.createElement('div');
                newItem.classList.add('item');
                newItem.innerHTML = `
                    <div class="image"><img src="${info.image}"></div>
                    <div class="name">${info.productName}</div>
                    <div class="totalPrice">$${info.price * item.quantity}</div>
                    <div class="quantity">
                        <span class="minus" onclick="changeQuantity(${item.product_id}, 'minus')"><</span>
                        <span>${item.quantity}</span>
                        <span class="plus" onclick="changeQuantity(${item.product_id}, 'plus')">></span>
                    </div>`;
                listCartHTML.appendChild(newItem);
            }
        });
    } else {
        let emptyMessage = document.createElement('div');
        emptyMessage.classList.add('empty-message');
        emptyMessage.innerText = "The cart is empty";
        listCartHTML.appendChild(emptyMessage);
    }
    
    iconCartSpan.innerText = totalQuantity;
    if (totalAmountSpan) {
        totalAmountSpan.innerText = '$' + grandTotal;
    }
};

const changeQuantity = (product_id, type) => {
    let positionItemInCart = cart.findIndex((value) => value.product_id == product_id);
    if (positionItemInCart >= 0) {
        if (type === 'plus') {
            cart[positionItemInCart].quantity += 1;
        } else {
            let val = cart[positionItemInCart].quantity - 1;
            if (val > 0) cart[positionItemInCart].quantity = val;
            else cart.splice(positionItemInCart, 1);
        }
    }
    addCartToHTML();
};

checkOutBtn.addEventListener('click', () => {
    if (cart.length > 0) {
        alert("You successfully checkout the Items!");
        cart = [];
        addCartToHTML();
        body.classList.remove('showCart');
    } else {
        alert("Your cart is empty!");
    }
});

initApp();