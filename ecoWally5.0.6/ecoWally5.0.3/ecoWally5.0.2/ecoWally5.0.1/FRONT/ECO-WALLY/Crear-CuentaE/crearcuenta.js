document .getElementById("registerForm").addEventListener("submit", function (event) {
    event.preventDefault();

    var formData = new FormData(this);

    var data = {};

    formData.forEach(function (value, key) {
      data[key] = value;
    });

    console.log("Datos capturados:", data);

    fetch("http://localhost:5000/Usuarios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        console.log("Raw response:", response);

        return response.json();
      })
      .then((data) => {
        console.log("Respuesta del servidor:", data);

        alert(data.mensaje);

        window.location.href =
          "/ecoWally5.0.3/ecoWally5.0.2/ecoWally5.0.1/FRONT/ECO-WALLY/LOGIN/LOGINp1/Login_v1/indexL.html";
      })
      .catch((error) => {
        console.error("Error:", error);

        alert("Error al registrar la cuenta: " + error.message);
      });
  });
