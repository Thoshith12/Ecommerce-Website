let cart = [];
let items = [];
let removeDuplicates = [];
let cartTotalPrice = 0;
let submit = 0
cart = JSON.parse(localStorage.getItem('cartItems'));
showCart()
function showCart() {

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
    displayItemsInCart(cart)
}

function displayItemsInCart(items) {
    let filteredArray = [];
    items.forEach((e, i) => {
        if (!removeDuplicates.includes(e.title)) {
            removeDuplicates.push(e.title)
        }
    })
    console.log(removeDuplicates)

    removeDuplicates.forEach((t) => {
        let findItem = items.find((e) => e.title == t);
        filteredArray.push(findItem);
    })
    console.log(filteredArray)
    filteredArray.forEach((product) => {
        cartItems.innerHTML += `<tr>
    <td><img src="${product.thumbnail ? product.thumbnail : (product?.images ? product.images[0] : product.image)}"></td>
    <td>${product.title.slice(0, 15)}</td>
    <td>${product.count}</td>
    <td>$${product.price}</td>
    </td>`;
    })
    cartItems.innerHTML += `<tr >
            <th  class="price" colspan="4">Total Price:</th>            
        </tr>`
    let price = document.querySelector('.price')
    price.innerHTML += `<td>$${cartTotalPrice}</td>`
}

function payment() {
    window.location.href = 'paymentPage.html';
}

function showAlert() {
    var alertBox = document.getElementById("alert");
    alertBox.innerText = "please submit the adress first";
    alertBox.style.display = "block";

    setTimeout(function () {
        alertBox.style.display = "none";
    }, 1000);
}
function saveAddressToFile(event) {
    event.preventDefault(); 
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const postalCode = document.getElementById("postal_code").value;
    const address = document.getElementById("address").value;
    const city = document.getElementById("city").value;
    const state = document.getElementById("state").value;
    const landmark = document.getElementById("landmark").value;
    const alternativePhnNo = document.getElementById("alternativePhnNo").value;

    const addressString = `Name: ${name}\nPhone Number: ${phone}\nPostal Code: ${postalCode}\nAddress: ${address}\nCity: ${city}\nState: ${state}\nLandmark: ${landmark}\nAlternative Phn no: ${alternativePhnNo}`;

    const blob = new Blob([addressString], { type: "text/plain" });
    const anchor = document.createElement("a");
    anchor.href = URL.createObjectURL(blob);
    anchor.download = "address.txt";
    anchor.click();
    payment();
}

document.getElementById("addressForm").addEventListener("submit", saveAddressToFile);

