let items;
let key;
let filteredItems;
let cart = [];
let main = document.querySelector('main');
let home = document.querySelector('.home');
let categories = document.querySelectorAll('.cat');
let select = document.querySelector('select');
let cartCount = document.getElementById('cartCount');
let cat = document.querySelector('#cartPage');
let cartNav = document.querySelector('#cartNav');
let removeDuplicates = [];
let filteredArray = [];
let dropdownOptions = document.querySelector('.dropdown-options');
let dropdown = document.querySelector(".dropdown-header");
let totalPrice = document.getElementById('totalPrice');
let cartTotalPrice = 0;

dropdownOptions.classList.add('cartPage');


fetchProducts(); // Calling the function to display all products by default

async function fetchProducts() {
    cat.classList.add('cartPage')
    dropdownOptions.classList.add('cartPage'),
        items = await fetch('https://dummyjson.com/products');
    let items2 = await fetch('https://fakestoreapi.com/products/');
    items = await items.json();
    items2 = await items2.json();
    items = items.products;
    items = [...items, ...items2];
    items = items.filter(e => 'OPPOF19' !== e.title);    // removing oppo smartphoine due to bad dimensions of product image
    filteredItems = items;
    displayData(items);
}

function displayData(filteredItems) {
    window.scrollTo(0, 0);
    cat.classList.add('cartPage');
    dropdownOptions.classList.add('cartPage');
    main.innerHTML = '';
    cartItems.innerHTML = "";
    let toHtml = filteredItems.map((product, index) => {
        return (`<article onclick='productDisplay(${index})'>
<img src="${product.thumbnail ? product.thumbnail : (product?.images ? product.images[0] : product.image)}">
<h3>${product.title.slice(0, 15)}</h3>
<h4>${product.description.slice(0, 300)}</h4>
<h2>$${product.price}</h2>
</article>`);
    });
    main.innerHTML = toHtml.join('');
}

function productDisplay(index) {
    window.scrollTo(0, 0);
    cat.classList.add('cartPage');
    dropdownOptions.classList.add('cartPage');
    let product = filteredItems.find((e, i) => index == i);
    main.innerHTML = '';
    cartItems.innerHTML = "";
    main.innerHTML = `<section>
<img src="${product.thumbnail ? product.thumbnail : (product?.images ? product.images[0] : product.image)}">
<aside>
<h3>${product.title}</h3>
<h4>${product.description}</h4>
<h2>$${product.price}</h2>
<div id="btn" onclick="addToCart(${index}); showAlert('Product added to cart');">Add to Cart</div>
</aside>
</section>`;
}

function showAlert(message) {
    window.scrollTo(0, 0);
    dropdownOptions.classList.add('cartPage');
    var alertBox = document.getElementById("alert");
    alertBox.innerHTML = message;
    alertBox.style.display = "block";

    setTimeout(function () {
        alertBox.style.display = "none";
    }, 1000);
}


function remove(t) {
    // window.scrollTo(0, 0);
    let getIdBeforeRemove;
    cart.forEach((e, i) => {
        if (e.title == t) {
            getIdBeforeRemove = i;
        }
    });
    cart = cart.filter((e, i) => getIdBeforeRemove !== i);
    showCart();
    updateCartCount();
}
function add(title) {
    // window.scrollTo(0, 0);
    let product = cart.find(item => item.title === title);
    cart.push(product);
    showCart();
    updateCartCount();

}

function toggleDropdown() {
    dropdownOptions.classList.toggle('cartPage')
}

function dropDown(text) {
    dropdown.innerHTML = text
    text = text.toLowerCase();
    filteredItems = items.filter((e) => text == e.category);
    displayData(filteredItems);
}

function addToCart(index) {
    let product = filteredItems.find((e, i) => index == i);
    cart.push(product);
    updateCartCount();
}


function updateCartCount() {
    cartCount.innerText = cart.length;
}



function showCart() {
    dropdownOptions.classList.add('cartPage');
    let cartPage = document.getElementById('cartPage');
    let cartItems = document.getElementById('cartItems');
    main.innerHTML = "";
    cartItems.innerHTML = "";
    cat.classList.remove('cartPage');

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty.</p>";
    } else {
        let items = cart.map((product, id) => {
            let numberOfItems = 0;
            cart.forEach((e, i) => {
                if (e.title == product.title) {
                    numberOfItems += 1;
                    if (id !== i) {

                    }
                }
            })
            product.count = numberOfItems;
            cartTotalPrice += product.price;
            return product;

        });
        displayItemsInCart(items)
    }

    totalPrice.innerText = `Total Price: $${cartTotalPrice.toFixed(2)}`;

    cartPage.style.display = 'block';
}


function displayItemsInCart(items) {
    dropdownOptions.classList.add('cartPage')
    localStorage.removeItem('cartItems');
    localStorage.removeItem('totalPrice');
    localStorage.setItem('cartItems', JSON.stringify(cart));
    localStorage.setItem('totalPrice', JSON.stringify(cartTotalPrice));
    let filteredArray = [];
    items.forEach((e, i) => {
        if (!removeDuplicates.includes(e.title)) {
            removeDuplicates.push(e.title)
        }
    })
    removeDuplicates.forEach((t) => {
        let findItem = items.find((e) => e.title == t);
        filteredArray.push(findItem);
    })
    cartItems.innerHTML = '';
    filteredArray.forEach((product) => {
        cartItems.innerHTML += `<article >
        <img src="${product.thumbnail ? product.thumbnail : (product?.images ? product.images[0] : product.image)}">
        <h3>${product.title.slice(0, 15)}</h3>
        <h4>${product.description.slice(0, 100)}</h4>
        <h2>$${product.price}</h2>
        <div class="add">
        <button onclick="remove('${product.title}')">-</button>
        <h6>${product.count}</h6>
        <button onclick="add('${product.title}')" >+</button>
        </div>
    </article>`;
    })
}
function checkOut() {
    if (cart.length !== 0) {
        window.location.href = 'checkout.html'
    }
    else{
        showAlert('Your cart is Empty')
    }
}

home.addEventListener('click', fetchProducts);
cartNav.addEventListener('click', showCart)

categories.forEach((category) => {
    category.addEventListener('click', (event) => {
        key = event.target.outerText.toLowerCase();
        filteredItems = items.filter(e => key == e.category);
        displayData(filteredItems);
    });
});

document.getElementById('cartNav').addEventListener('click', showCart);