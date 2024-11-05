document.addEventListener("DOMContentLoaded", function () {
    // Cart Confirmation Message (for other pages)
    const urlParams = new URLSearchParams(window.location.search);
    const addedProduct = urlParams.get("added");
    if (addedProduct) {
        showCartConfirmation(addedProduct);
    }

    function showCartConfirmation(product) {
        const confirmation = document.createElement("div");
        confirmation.className = "cart-confirmation";
        confirmation.innerText = `Added ${product.replace("-", " ")} to the cart!`;
        document.body.appendChild(confirmation);
        setTimeout(() => {
            confirmation.remove();
        }, 3000);
    }

    // Cart Page Functionality
    const cartItems = document.querySelectorAll(".cart-item");
    const subtotalElement = document.querySelector(".summary-subtotal");
    const discountElement = document.querySelector(".summary-discount");
    const taxElement = document.querySelector(".summary-tax");
    const shippingElement = document.querySelector(".summary-shipping");
    const totalElement = document.querySelector(".summary-total");

    const discountRate = 0.1; // 10% discount
    const taxRate = 0.08; // 8% tax
    const shippingCost = 50.00; // Shipping cost in INR

    // Quantity Control
    cartItems.forEach((item) => {
        const quantityInput = item.querySelector(".quantity-input");
        const decreaseButton = item.querySelector(".decrease-quantity");
        const increaseButton = item.querySelector(".increase-quantity");
        const itemPrice = parseFloat(item.querySelector(".item-price p").innerText.replace("₹", ""));

        decreaseButton.addEventListener("click", () => updateQuantity(item, -1));
        increaseButton.addEventListener("click", () => updateQuantity(item, 1));
        quantityInput.addEventListener("change", () => updateSubtotal(item));

        function updateQuantity(item, change) {
            let quantity = parseInt(quantityInput.value);
            quantity = Math.max(1, quantity + change);
            quantityInput.value = quantity;
            updateSubtotal(item);
        }

        function updateSubtotal(item) {
            const quantity = parseInt(quantityInput.value);
            const newItemTotal = quantity * itemPrice;
            item.querySelector(".item-price p").innerText = `₹${newItemTotal.toFixed(2)}`;

            calculateTotals();
        }
    });

    // Calculate Total Price and Update Pricing Summary
    function calculateTotals() {
        // Calculate subtotal
        const subtotal = Array.from(cartItems).reduce((sum, item) => {
            const price = parseFloat(item.querySelector(".item-price p").innerText.replace("₹", ""));
            return sum + price;
        }, 0);

        // Calculate discount, tax, and total
        const discount = subtotal * discountRate;
        const tax = (subtotal - discount) * taxRate;
        const total = subtotal - discount + tax + shippingCost;

        // Update summary elements
        subtotalElement.innerText = `₹${subtotal.toFixed(2)}`;
        discountElement.innerText = `- ₹${discount.toFixed(2)}`;
        taxElement.innerText = `₹${tax.toFixed(2)}`;
        shippingElement.innerText = `₹${shippingCost.toFixed(2)}`;
        totalElement.innerText = `₹${total.toFixed(2)}`;
    }

    // Save to Local Storage
    function saveCartToLocalStorage() {
        const cartData = Array.from(cartItems).map((item) => {
            const name = item.querySelector(".item-details h2").innerText;
            const quantity = parseInt(item.querySelector(".quantity-input").value);
            const price = parseFloat(item.querySelector(".item-price p").innerText.replace("₹", ""));
            return { name, quantity, price };
        });
        localStorage.setItem("cart", JSON.stringify(cartData));
    }

    // Load Cart from Local Storage
    function loadCartFromLocalStorage() {
        const savedCart = JSON.parse(localStorage.getItem("cart"));
        if (savedCart) {
            // Logic to populate cart items if needed
        }
    }

    // Save cart on quantity change or item removal
    cartItems.forEach((item) => {
        const quantityInput = item.querySelector(".quantity-input");
        quantityInput.addEventListener("change", saveCartToLocalStorage);
        item.querySelector(".remove-item").addEventListener("click", () => {
            item.remove();
            calculateTotals();
            saveCartToLocalStorage();
        });
    });

    // Initial calculation on page load
    calculateTotals();
    loadCartFromLocalStorage();
});
document.addEventListener("DOMContentLoaded", function () {
    // Cart Confirmation Message (for other pages)
    const urlParams = new URLSearchParams(window.location.search);
    const addedProduct = urlParams.get("added");
    if (addedProduct) {
        showCartConfirmation(addedProduct);
    }

    function showCartConfirmation(product) {
        const confirmation = document.createElement("div");
        confirmation.className = "cart-confirmation";
        confirmation.innerText = `Added ${product.replace("-", " ")} to the cart!`;
        document.body.appendChild(confirmation);
        setTimeout(() => {
            confirmation.remove();
        }, 3000);
    }

    // Cart Page Functionality
    const cartItems = document.querySelectorAll(".cart-item");
    const subtotalElement = document.querySelector(".summary-subtotal");
    const discountElement = document.querySelector(".summary-discount");
    const taxElement = document.querySelector(".summary-tax");
    const shippingElement = document.querySelector(".summary-shipping");
    const totalElement = document.querySelector(".summary-total");

    const discountRate = 0.1; // 10% discount
    const taxRate = 0.08; // 8% tax
    const shippingCost = 50.00; // Shipping cost in INR

    // Quantity Control
    cartItems.forEach((item) => {
        const quantityInput = item.querySelector(".quantity-input");
        const decreaseButton = item.querySelector(".decrease-quantity");
        const increaseButton = item.querySelector(".increase-quantity");
        const itemPrice = parseFloat(item.querySelector(".item-price p").innerText.replace("₹", ""));

        decreaseButton.addEventListener("click", () => updateQuantity(item, -1));
        increaseButton.addEventListener("click", () => updateQuantity(item, 1));
        quantityInput.addEventListener("change", () => updateSubtotal(item));

        function updateQuantity(item, change) {
            let quantity = parseInt(quantityInput.value);
            quantity = Math.max(1, quantity + change);
            quantityInput.value = quantity;
            updateSubtotal(item);
        }

        function updateSubtotal(item) {
            const quantity = parseInt(quantityInput.value);
            const newItemTotal = quantity * itemPrice;
            item.querySelector(".item-price p").innerText = `₹${newItemTotal.toFixed(2)}`;

            calculateTotals();
        }
    });

    // Calculate Total Price and Update Pricing Summary
    function calculateTotals() {
        const subtotal = Array.from(cartItems).reduce((sum, item) => {
            const price = parseFloat(item.querySelector(".item-price p").innerText.replace("₹", ""));
            return sum + price;
        }, 0);

        const discount = subtotal * discountRate;
        const tax = (subtotal - discount) * taxRate;
        const total = subtotal - discount + tax + shippingCost;

        // Update summary elements
        subtotalElement.innerText = `₹${subtotal.toFixed(2)}`;
        discountElement.innerText = `- ₹${discount.toFixed(2)}`;
        taxElement.innerText = `₹${tax.toFixed(2)}`;
        shippingElement.innerText = `₹${shippingCost.toFixed(2)}`;
        totalElement.innerText = `₹${total.toFixed(2)}`;

        // Save total to localStorage
        localStorage.setItem("finalPrice", total.toFixed(2));
    }

    // Save to Local Storage
    function saveCartToLocalStorage() {
        const cartData = Array.from(cartItems).map((item) => {
            const name = item.querySelector(".item-details h2").innerText;
            const quantity = parseInt(item.querySelector(".quantity-input").value);
            const price = parseFloat(item.querySelector(".item-price p").innerText.replace("₹", ""));
            return { name, quantity, price };
        });
        localStorage.setItem("cart", JSON.stringify(cartData));
    }

    // Load Cart from Local Storage
    function loadCartFromLocalStorage() {
        const savedCart = JSON.parse(localStorage.getItem("cart"));
        if (savedCart) {
            // Logic to populate cart items if needed
        }
    }

    // Save cart on quantity change or item removal
    cartItems.forEach((item) => {
        const quantityInput = item.querySelector(".quantity-input");
        quantityInput.addEventListener("change", saveCartToLocalStorage);
        item.querySelector(".remove-item").addEventListener("click", () => {
            item.remove();
            calculateTotals();
            saveCartToLocalStorage();
        });
    });

    // Initial calculation on page load
    calculateTotals();
    loadCartFromLocalStorage();

    // Checkout Page Final Price Display
    const finalPriceElement = document.getElementById("final-price");
    if (finalPriceElement) {
        const finalPrice = localStorage.getItem("finalPrice") || "0.00";
        finalPriceElement.innerText = `₹${finalPrice}`;
    }
});

