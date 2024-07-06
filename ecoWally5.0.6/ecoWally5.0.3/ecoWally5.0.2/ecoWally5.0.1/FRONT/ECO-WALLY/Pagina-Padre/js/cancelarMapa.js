function clearFields() {
    
    var textInputs = document.querySelectorAll('#inputs input[type="text"]');
    var selectInputs = document.querySelectorAll('#inputs select');
    textInputs.forEach(function (input) {
        input.value = '';
    });

    selectInputs.forEach(function (select) {
        select.value = '';
    });
}

document.addEventListener('DOMContentLoaded', function () {

    document.getElementById('cancel-button').onclick = clearFields;
});