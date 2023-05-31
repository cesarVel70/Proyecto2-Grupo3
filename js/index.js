// rol administrador 
document.addEventListener("DOMContentLoaded", function () {
    // Verificar el rol de administrador
    let rol = localStorage.getItem("rol");
    if (rol === "administrador") {
        // Mostrar el botón de cerrar sesión
        let cerrarSesion = document.getElementById("cerrarSesion");
        cerrarSesion.innerHTML = 'cerrar sesion |';
        let etiqueta = document.getElementById("etiqueta")
        etiqueta.innerHTML = 'Administrador';

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
            window.location.href = "index.html";
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
        cerrarSesion.innerHTML = 'cerrar sesion';

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
            window.location.href = "index.html";
        });
    }
});

// creacion de tarjetas automaticamente desde el localStorage
let cuerpoCentral = document.getElementById("cuerpoCentral");

function actualizarTarjetas() {
  cuerpoCentral.innerHTML = "";

  let contenido = JSON.parse(localStorage.getItem("juegos"));

  contenido.forEach((element) => {
    if (element.publicado == 'true') {
      const contenedor = document.createElement("div");
      const card = `
          <div class="card mt-5" style="width: 18rem;">
              <img src="${element.url}" style="width: 300px; height:280px;" class="card-img-top img-fluid " alt="...">
              <div class="card-body">
                  <h5 class="card-title">${element.nombre}</h5>
                  <p class="card-text overflow-y-scroll">${element.descripcion}</p>
                  <a href="#" class="btn btn-success w-100">Comprar</a>
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
