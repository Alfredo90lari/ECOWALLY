document.getElementById('c_fname').addEventListener('input', function () {
    validateInput(this, 'error-message-fname');
    errorMessage.textContent = 'No puedes ingresar numeros';

  });
  
  document.getElementById('c_lname').addEventListener('input', function () {
    validateInput(this, 'error-message-lname');
  });
  
  document.getElementById('c_companyname').addEventListener('input', function () {
    validateUsername(this);
  });
  
  function validateInput(input, errorMessageId) {
    const pattern = /^[a-zA-Z]{0,25}$/;
    const errorMessage = document.getElementById(errorMessageId);
  
    if (!pattern.test(input.value)) {
      input.value = input.value.replace(/[^a-zA-Z]/g, '');
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
      errorMessage.textContent = 'Debe tener entre 3 y 25 caracteres y solo puede contener letras.';
      errorMessage.style.display = 'none';
    }
  }
  
  function validateUsername(input) {
    const pattern = /^[a-zA-Z0-9_-]{0,50}$/;
    const errorMessage = document.getElementById('error-message');
  
    if (!pattern.test(input.value)) {
      input.value = input.value.replace(/[^a-zA-Z0-9_-]/g, '');
      errorMessage.style.display = 'block';
    } else {
      errorMessage.style.display = 'none';
    }
  
    if (input.value.length > 50) {
      input.value = input.value.substring(0, 50);
    }
  
    if (input.value.length < 3 && input.value.length > 0) {
      errorMessage.textContent = 'El nombre de usuario debe tener al menos 3 caracteres.';
      errorMessage.style.display = 'block';
    } else if (input.value.length >= 3) {
      errorMessage.textContent = 'El nombre de usuario debe tener entre 3 y 50 caracteres y solo puede contener letras, números, guiones bajos (_) y guiones (-).';
      errorMessage.style.display = 'none';
    }
  }
  

  