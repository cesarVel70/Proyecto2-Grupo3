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
       });
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

// creacion de tarjetas automaticamente desde el localStorage
let cuerpoCentral = document.getElementById("cuerpoCentral");

function actualizarTarjetas() {
      cuerpoCentral.innerHTML = "";
      let contenido = JSON.parse(localStorage.getItem("juegos"));

  contenido.forEach((element) => {
    if (element.publicado == "true") {
      const contenedor = document.createElement("div");
      const elementoHTML = element.nombre.split(" ").join("").toLowerCase()
      const card = `
  <div class="card border-dark mt-4 mb-4" style="width: 18rem">
            <img
              src="${element.url}"
              class="card-img-top"
              alt="${element.nombre}"
            />
            <div class="card-body cardMod">
              <h5 class="card-title">${element.nombre}</h5>
              <p class="card-text">
                ${element.descripcion}
              </p>
              <a href="/pages/games/${elementoHTML}.html" class="btn btn-success" target="_blank">Ver mas</a>
            </div>
          </div>
`;
      contenedor.innerHTML = card;
      cuerpoCentral.append(contenedor);
    }
  });
}

actualizarTarjetas();

/* este codigo esta pendiente de si el localstorage tuvo cambios, si hubo cambios entonces
llama a la funcion de actualizarTarjeta*/
window.addEventListener("storage", () => {
  actualizarTarjetas();
});



