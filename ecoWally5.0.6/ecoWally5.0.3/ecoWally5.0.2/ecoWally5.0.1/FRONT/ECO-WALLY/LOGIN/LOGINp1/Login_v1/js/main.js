document.getElementById("loginForm").addEventListener("submit", function(event) {
  event.preventDefault();
  
  var formData = new FormData(this);
  var formDataObject = {};
  
  formData.forEach(function(value, key) {
      formDataObject[key] = value;
  });
  
  fetch("http://localhost:5000/login", {
      method: "POST",
      body: JSON.stringify(formDataObject),
      headers: {
          "Content-Type": "application/json"
      }
  })
  .then(response => {
      if (!response.ok) {
          throw new Error("Usuario o contraseña incorrectos");
      }
      return response.json();
  })
  .then(data => {
      alert(data.message); 
      if (data.message.includes('Login exitoso como Administrador')) {
          window.location.href = '/ecoWally5.0.3/ecoWally5.0.2/ecoWally5.0.1/FRONT/ECO-WALLY/Dasboard/pages/dashboard.html';
      } else if (data.message.includes('Login exitoso como Usuario')) {
          window.location.href = '/ecoWally5.0.3/ecoWally5.0.2/ecoWally5.0.1/FRONT/ECO-WALLY/Pagina-Padre/index.html';
      }
  })
  .catch(error => {
      console.error("Error:", error);
      alert("Usuario o contraseña incorrectos"); 
  });
});
