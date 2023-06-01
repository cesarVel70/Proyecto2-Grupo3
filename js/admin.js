// Al cargar la pagina de administración
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

    // Agregar el evento de clic al botón de cerrar sesión
    cerrarSesion.addEventListener("click", function () {
      // Eliminar el rol almacenado en localStorage
      localStorage.removeItem("rol");
      // Redirigir al inicio de sesión
      window.location.href = "login.html";
    });
  }

  // bloqueo de url para usuariosNormales y no registrados
  let role = localStorage.getItem("rol");
  if (
    (role === "usuario" || !role) &&
    window.location.href.includes("admin.html")
  ) {
    window.location.href = "../index.html";
  }

  class Juego {
    constructor(codigo, nombre, categoria, descripcion, publicado, url) {
      this.codigo = codigo;
      this.nombre = nombre;
      this.categoria = categoria;
      this.descripcion = descripcion;
      this.publicado = publicado;
      this.url = url;
    }
  }

  // boton +agregar, funcionalidad
  let agregarBtn = document.querySelector("#modalFooter");

  agregarBtn.addEventListener("click", function () {
    // Obtener los valores de los input del formulario
    let codigo = Math.floor(Math.random() * 1000) + 1;
    let nombre = document
      .getElementById("recipient-name")
      .value
      .trim();
    let categoria = document
      .getElementById("recipient-categoria")
      .value.toLowerCase()
      .trim();
    let descripcion = document
      .getElementById("message-text")
      .value
      .trim();
    let publicado = document
      .getElementById("recipient-publicado")
      .value.toLowerCase()
      .trim();
    let url = document
      .getElementById("recipient-url")
      .value
      .trim();

    // Crear un objeto Juego con los datos ingresados
    let juego = new Juego(
      codigo,
      nombre,
      categoria,
      descripcion,
      publicado,
      url
    );

    // Obtener los datos del localStorage
    let juegosGuardados = localStorage.getItem("juegos");

    if (juegosGuardados) {
      // Si hay juegos guardados, convertirlos en un array
      juegosGuardados = JSON.parse(juegosGuardados);
    } else {
      // Si no hay juegos guardados, inicializar un array vacío
      juegosGuardados = [];
    }

    // Agregar el nuevo juego al array vacio
    juegosGuardados.push(juego);

    // Guardar el array actualizado en el localStorage
    localStorage.setItem("juegos", JSON.stringify(juegosGuardados));

    // Limpiar los campos del formulario
    document.getElementById("recipient-name").value = "";
    document.getElementById("recipient-categoria").value = "";
    document.getElementById("message-text").value = "";
    document.getElementById("recipient-publicado").value = "false";
    document.getElementById("recipient-url").value = "";

    // Cerrar el modal
    var modal = document.getElementById("agregarModal");
    var modalBootstrap = bootstrap.Modal.getInstance(modal);
    modalBootstrap.hide();

    cargarTabla();
  });

  // mostrar Datos en tabla
  const cuerpoTabla = document.querySelector("#cuerpo-tabla");

  function cargarTabla() {
    cuerpoTabla.innerHTML = "";
    let juegosGuardados = localStorage.getItem("juegos");
    juegosGuardados = JSON.parse(juegosGuardados);
    juegosGuardados.forEach((element) => {
      const fila = document.createElement("tr");
      const celdas = `
            <th>${element.codigo}</th>
            <td>${element.nombre}</td>
            <td>${element.categoria}</td>
            <td>${element.descripcion}</td>
            <td>${element.publicado}</td>
            <td>${element.url}</td>
            <td>
            <div class="d-flex gap-2">
            <button class="btn btn-outline-primary" onclick="mostrarModalEdit(${element.codigo})"><i class="fas fa-edit"></i></button>
            <button class="btn btn-outline-danger" onclick="borrar(${element.codigo})"><i class="fa-regular fa-circle-xmark"></i></button>
            </div>
            </td>
            `;
      fila.innerHTML = celdas;
      cuerpoTabla.append(fila);
    });
  }
  cargarTabla();
});

// boton de borrar funcionalidad
function borrar(codigo) {
  let juegosGuardados = localStorage.getItem("juegos");
  juegosGuardados = JSON.parse(juegosGuardados);

  let index = juegosGuardados.findIndex((element) => element.codigo == codigo);
  let juegoAEliminar = juegosGuardados[index].nombre;

  let validar = confirm(
    `Esta seguro/a que quiere eliminar este juego ${juegoAEliminar}?`
  );

  if (validar) {
    juegosGuardados.splice(index, 1);
    localStorage.setItem("juegos", JSON.stringify(juegosGuardados));
    cargarTabla();
  }
}

// boton de editar funcionalidad
const myModal = new bootstrap.Modal(document.getElementById("editarModal"));
let codigoElementUpdate;

function mostrarModalEdit(codigo) {
  let juegosGuardados = localStorage.getItem("juegos");
  juegosGuardados = JSON.parse(juegosGuardados);
  codigoElementUpdate = codigo;
  // posicionamiento del objeto
  let index = juegosGuardados.findIndex(
    (element) => element.codigo == codigoElementUpdate
  );

  document.getElementById("editar-name").value = juegosGuardados[index].nombre;
  document.getElementById("editar-categoria").value =
    juegosGuardados[index].categoria;
  document.getElementById("editar-text").value =
    juegosGuardados[index].descripcion;
  document.getElementById("editar-publicado").value =
    juegosGuardados[index].publicado;
  document.getElementById("editar-url").value = juegosGuardados[index].url;
  // metodo para mostrar el modal
  myModal.show();
}

let btnEditar = document.getElementById("editFooter");
btnEditar.addEventListener("click", function (event) {
  event.preventDefault();
  let juegosGuardados = localStorage.getItem("juegos");
  juegosGuardados = JSON.parse(juegosGuardados);

  let index = juegosGuardados.findIndex(
    (element) => element.codigo == codigoElementUpdate
  );

  juegosGuardados[index].nombre = document.getElementById("editar-name").value;
  juegosGuardados[index].categoria =
    document.getElementById("editar-categoria").value;
  juegosGuardados[index].descripcion =
    document.getElementById("editar-text").value;
  juegosGuardados[index].publicado =
    document.getElementById("editar-publicado").value;
  juegosGuardados[index].url = document.getElementById("editar-url").value;

  // guardamos los cambios realizados en el localstorage
  localStorage.setItem("juegos", JSON.stringify(juegosGuardados));
  cargarTabla();
  myModal.hide();
});

// mostrar Datos en tabla
const cuerpoTabla = document.querySelector("#cuerpo-tabla");

function cargarTabla() {
  cuerpoTabla.innerHTML = "";
  let juegosGuardados = localStorage.getItem("juegos");
  juegosGuardados = JSON.parse(juegosGuardados);
  juegosGuardados.forEach((element) => {
    const fila = document.createElement("tr");
    const celdas = `
            <th>${element.codigo}</th>
            <td>${element.nombre}</td>
            <td>${element.categoria}</td>
            <td>${element.descripcion}</td>
            <td>${element.publicado}</td>
            <td>${element.url}</td>
            <td>
            <div class="d-flex gap-2">
            <button class="btn btn-outline-primary" onclick="mostrarModalEdit(${element.codigo})"><i class="fas fa-edit"></i></button>
            <button class="btn btn-outline-danger" onclick="borrar(${element.codigo})"><i class="fa-regular fa-circle-xmark"></i></button>
            </div>
            </td>
            `;
    fila.innerHTML = celdas;
    cuerpoTabla.append(fila);
  });
}
cargarTabla();
