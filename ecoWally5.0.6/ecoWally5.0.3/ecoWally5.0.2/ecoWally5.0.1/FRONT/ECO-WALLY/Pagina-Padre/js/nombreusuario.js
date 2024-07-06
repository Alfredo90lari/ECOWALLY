function actualizarNombreUsuario(nombreUsuario) {
    var userLink = document.getElementById('userLink');
    if (userLink) {
      userLink.innerHTML = `<img src="images/user.svg" alt="Icono usuario"/> ${nombreUsuario}`;
    }
  }