// rol administrador
document.addEventListener("DOMContentLoaded", function () {
  // Verificar el rol de administrador
  let rol = localStorage.getItem("rol");
  if (rol === "administrador") {
    // Mostrar el botón de cerrar sesión
    let cerrarSesion = document.getElementById("cerrarSesion");
    cerrarSesion.innerHTML = "| Cerrar Sesión |";
    let etiqueta = document.getElementById("etiqueta");
    etiqueta.innerHTML = "Administrador";
      etiqueta.addEventListener("click", () => {
            window.location.href = "/pages/admin.html";
      } )
    // ocultamos los botones de ingresar y registrar
    let btnIngresar = document.getElementById("btn-ingresar");
    let btnRegistro = document.getElementById("btn-registro");
    btnIngresar.style.display = "none";
    btnRegistro.style.display = "none";

    // Agregar el evento de clic al botón de cerrar sesión
    cerrarSesion.addEventListener("click", function () {
      // Eliminar el rol almacenado en localStorage
      localStorage.removeItem("rol");
      // Redirigir al inicio de sesión
      window.location.href = "/index.html";
    });
  }
});

// rol usuario
document.addEventListener("DOMContentLoaded", function () {
  // Verificar el rol
  let rol = localStorage.getItem("rol");
  if (rol === "usuario") {
    // Mostrar el botón de cerrar sesión
    let cerrarSesion = document.getElementById("cerrarSesion");
    cerrarSesion.innerHTML = "| Cerrar Sesión |";

    // ocultamos los botones de ingresar y registrar
    let btnIngresar = document.getElementById("btn-ingresar");
    let btnRegistro = document.getElementById("btn-registro");
    btnIngresar.style.display = "none";
    btnRegistro.style.display = "none";

    // Agregar el evento de clic al botón de cerrar sesión
    cerrarSesion.addEventListener("click", function () {
      // Eliminar el rol almacenado en localStorage
      localStorage.removeItem("rol");
      // Redirigir al inicio de sesión
      window.location.href = "/index.html";
    });
  }
});
