// Al cargar la pagina de administración
document.addEventListener("DOMContentLoaded", function () {
    // Verificar el rol de administrador
    let rol = localStorage.getItem("rol");
    if (rol === "administrador") {
        // Mostrar el botón de cerrar sesión
        let cerrarSesion = document.getElementById("cerrarSesion");
        cerrarSesion.innerHTML = 'cerrar sesion |';
        let etiqueta = document.getElementById("etiqueta")
        etiqueta.innerHTML = 'Administrador';

        // Agregar el evento de clic al botón de cerrar sesión
        cerrarSesion.addEventListener("click", function () {
            // Eliminar el rol almacenado en localStorage
            localStorage.removeItem("rol");
            // Redirigir al inicio de sesión
            window.location.href = "login.html";
        });
    }
});

// bloqueo de url para usuariosNormales y no registrados
let rol = localStorage.getItem("rol");
if ((rol === "usuario" || !rol) && window.location.href.includes("admin.html")) {
    window.location.href = "../index.html";
}

