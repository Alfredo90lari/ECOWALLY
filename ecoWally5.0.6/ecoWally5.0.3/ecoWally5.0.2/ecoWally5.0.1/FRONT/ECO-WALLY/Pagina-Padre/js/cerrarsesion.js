function logout() {
    fetch('/logout', {
        method: 'GET',
        credentials: 'same-origin'
    })
    .then(response => response.json())
    .then(data => {
        if (data.mensaje === 'Sesión cerrada exitosamente') {
            alert('Sesión cerrada exitosamente');
            window.location.href = '/ecoWally5.0.3/ecoWally5.0.2/ecoWally5.0.1/FRONT/ECO-WALLY/Dasboard/pages/dashboard.html';
        }
    })
    .catch(error => console.error('Error al cerrar sesión:', error));
}