$(document).ready(function () {
  $("#loginForm").submit(function (event) {
    // Evita que se envíe el formulario
    event.preventDefault();

    // Muestra la pantalla de carga
    $("#loader").show();

    // Simula una carga (aquí puedes poner tu lógica de inicio de sesión)
    setTimeout(function () {
      // Oculta la pantalla de carga después de un tiempo de espera (aquí puedes redirigir al usuario después del inicio de sesión)
      $("#loader").hide();
      // Por ejemplo, redirige a otra página
      window.location.href = "dashboard.html";
    }, 3000); // Cambia este valor por el tiempo que desees de simulación de carga (en milisegundos)
  });
});
