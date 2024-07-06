document.getElementById('username').addEventListener('input', function () {
    validateInput(this, 'error-message-username');
});

document.getElementById('password').addEventListener('input', function () {
    validateInput(this, 'error-message-pass');
});

function validateInput(input, errorMessageId) {
    const pattern = /^[a-zA-Z0-9_-.]{0,15}$/;
    const errorMessage = document.getElementById(errorMessageId);

    if (!pattern.test(input.value)) {
        input.value = input.value.replace(/[^a-zA-Z0-9_-.]/g, '');
        errorMessage.textContent = 'Caracteres no permitidos.';
        errorMessage.style.display = 'block';
    } else {
        errorMessage.style.display = 'none';
    }

    if (input.value.length > 15) {
        input.value = input.value.substring(0, 15);
    }

    if (input.value.length < 3 && input.value.length > 0) {
        errorMessage.textContent = 'Debe tener al menos 3 caracteres.';
        errorMessage.style.display = 'block';
    } else if (input.value.length >= 3) {
        errorMessage.textContent = 'Debe tener entre 3 y 15 caracteres y solo puede contener letras, números, guiones(-) y guiones bajos(_) .';
        errorMessage.style.display = 'none';
    }
}