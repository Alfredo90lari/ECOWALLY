document.getElementById('nombre').addEventListener('input', function () {
    validateInput(this, 'error-message-nombre');
});

document.getElementById('apellido').addEventListener('input', function () {
    validateInput(this, 'error-message-apellido');
});

function validateInput(input, errorMessageId) {
    const pattern = /^[a-zA-Z]{0,25}$/;
    const errorMessage = document.getElementById(errorMessageId);

    if (!pattern.test(input.value)) {
        input.value = input.value.replace(/[^a-zA-Z]/g, '');
        errorMessage.textContent = 'Caracteres no permitidos.';
        errorMessage.style.display = 'block';
    } else {
        errorMessage.style.display = 'none';
    }

    if (input.value.length > 25) {
        input.value = input.value.substring(0, 25);
    }

    if (input.value.length < 3 && input.value.length > 0) {
        errorMessage.textContent = 'Debe tener al menos 3 caracteres.';
        errorMessage.style.display = 'block';
    } else if (input.value.length >= 3) {
        errorMessage.textContent = 'Debe tener entre 3 y 25 caracteres y solo puede contener letras Mayusculas o minusculas.';
        errorMessage.style.display = 'none';
    }
}
