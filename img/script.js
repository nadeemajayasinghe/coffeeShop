let search = document.querySelector('.search-box');

document.querySelector('#search-icon').onclick = () => {
    search.classList.toggle('active');
}


// Add items to cart and display them on the cart page
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Add to cart functionality
document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", (e) => {
        e.preventDefault();
        const product = {
            name: button.dataset.name,
            price: button.dataset.price,
            img: button.dataset.img,
        };
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
        alert(`${product.name} has been added to your cart.`);
    });
});


// Display cart items in the cart page
const cartItemsContainer = document.getElementById("cart-items");
if (cartItemsContainer) {
    function displayCart() {
        cartItemsContainer.innerHTML = ""; // Clear previous cart items
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
            return;
        }

        cart.forEach((item, index) => {
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");

            cartItem.innerHTML = `
                <img src="${item.img}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p>Price: Rs.${item.price}/=</p>
                    <button class="buy-btn" data-index="${index}">Buy</button>
                    <button class="remove-btn" data-index="${index}">Remove</button>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
        });
        

        
        // Add functionality for remove buttons
        document.querySelectorAll(".remove-btn").forEach((button) => {
            button.addEventListener("click", () => {
                const index = button.dataset.index;
                cart.splice(index, 1);
                localStorage.setItem("cart", JSON.stringify(cart));
                displayCart();
            });
        });
        

        
        // Add functionality for buy buttons
        document.querySelectorAll(".buy-btn").forEach((button) => {
            button.addEventListener("click", (e) => {
                const index = e.target.dataset.index;
                const boughtItem = cart[index];
                alert(`Thank you for purchasing ${boughtItem.name}!`);
                cart.splice(index, 1); // Remove the bought item
                localStorage.setItem("cart", JSON.stringify(cart));
                displayCart();
            });
        });
    }

    displayCart();
}


