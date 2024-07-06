document.addEventListener('DOMContentLoaded', () => {
    const cartItems = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    let cart = [];
    let totalPrice = 0;

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (event) => {
            const productElement = event.target.closest('.product');
            const productId = productElement.dataset.id;
            const productName = productElement.querySelector('h2').innerText;
            const productPrice = parseFloat(productElement.querySelector('p').innerText.replace('Precio: $', ''));

            // Añadir producto al carrito
            const cartItem = { id: productId, name: productName, price: productPrice };
            cart.push(cartItem);
            totalPrice += productPrice;

            // Actualizar la interfaz del carrito
            const li = document.createElement('li');
            li.innerText = `${productName} - $${productPrice}`;
            cartItems.appendChild(li);

            totalPriceElement.innerText = `Total: $${totalPrice.toFixed(2)}`;
        });
    });
});
