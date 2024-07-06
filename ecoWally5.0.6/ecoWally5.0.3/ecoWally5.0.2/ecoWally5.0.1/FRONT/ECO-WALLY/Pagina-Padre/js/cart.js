// Función para incrementar la cantidad de productos
function incrementQuantity(element) {
    var input = element.parentNode.previousElementSibling;
    var currentValue = parseInt(input.value);
    input.value = currentValue + 1;
    updateTotalPrice(input);
}

// Función para decrementar la cantidad de productos
function decrementQuantity(element) {
    var input = element.parentNode.nextElementSibling;
    var currentValue = parseInt(input.value);
    if (currentValue > 1) {
        input.value = currentValue - 1;
        updateTotalPrice(input);
    }
}

// Función para validar la cantidad ingresada
function validateQuantity(element) {
    var currentValue = parseInt(element.value);
    if (isNaN(currentValue) || currentValue < 1) {
        element.value = 1;
    }
    updateTotalPrice(element);
}


function updateTotalPrice(input) {
    var cantidad = parseInt(input.value);
    var precio = 150; // Precio de producto 
    var total = cantidad * precio;
    var totalElement = input.closest("tr").querySelector(".product-total");
    totalElement.textContent = 'Q' + total.toFixed(2);
    updateCartTotal();
}


function updateCartTotal() {
    var subtotal = 0;
    var productList = document.querySelectorAll(".product-row");

    productList.forEach(function (row) {
        var totalElement = row.querySelector(".product-total");
        var total = parseFloat(totalElement.textContent.replace('Q', '')); 
        subtotal += total;
    });

    var subtotalElement = document.querySelector("#subtotal-amount");
    var totalElement = document.querySelector("#total-amount");

    subtotalElement.textContent = 'Q' + subtotal.toFixed(2);
    totalElement.textContent = 'Q' + subtotal.toFixed(2); 
}


function eliminarProducto(element) {
    var row = element.closest("tr");
    row.remove();
    updateCartTotal();
}


;
