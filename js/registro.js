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
      window.location.href = "/pages/categoria-juegos.html";
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
      window.location.href = "/pages/categoria-juegos.html";
    });
  }
});

// Traemos todos los elementos del HTML.
const formulario = document.getElementById("login-form");
const correo = document.getElementById("correo");
const clave = document.getElementById("clave");
const confirmarClave = document.getElementById("confirmar-clave");
const modalConfirmacion = document.querySelector(".agregar-modal");

// Verificamos si lo que se introduce está vacio.
const estaVacia = (valor) => (valor == "" ? false : true);

// Regex de email.
const emailValido = (email) => {
  const re = /^\w+([\.\+\-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
  return re.test(email);
};

// Regex de contraseña, sea 8 carácteres, con números, letras tanto minúscula y mayúsculas.
const contraseniaValida = (clave) => {
  const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  return re.test(clave);
};

// Función para mostrar el mensaje de error de los inputs .
const mostrarError = (input, msj) => {
  const validacion = input.parentElement;
  validacion.classList.remove("correcto");
  validacion.classList.add("error");
  const error = validacion.querySelector("small");
  error.textContent = msj;
};

// Función para mostrar si el input es válido.
const mostrarCorrecto = (input) => {
  const validacion = input.parentElement;
  validacion.classList.remove("error");
  validacion.classList.add("correcto");
  const error = validacion.querySelector("small");
  error.textContent = "";
};

// Verificamos si el email es válido.
const verificarEmail = () => {
  let validado = false;
  const correoValor = correo.value.trim();
  if (!estaVacia(correoValor)) {
    mostrarError(correo, "El correo electrónico es obligatorio");
  } else if (!emailValido(correoValor)) {
    mostrarError(correo, "El correo no es válido");
  } else {
    mostrarCorrecto(correo);
    validado = true;
  }
  return validado;
};

// Verificamos si la contraseña cumple con el regex.
const verificarContrasenia = () => {
  let validado = false;
  const claveValor = clave.value.trim();
  if (!estaVacia(claveValor)) {
    mostrarError(clave, "La clave es obligatoria");
  } else if (!contraseniaValida(claveValor)) {
    mostrarError(
      clave,
      "La contraseña debe tener al menos 8 caracteres, una mayuscula, una minuscula, y números"
    );
  } else {
    mostrarCorrecto(clave);
    validado = true;
  }
  return validado;
};

// Verificamos si la contraseña son iguales.
const esIgualAContrasenia = () => {
  let validado = false;
  const claveValor = clave.value.trim();
  const confirmarClaveValor = confirmarClave.value.trim();
  if (!estaVacia(confirmarClaveValor)) {
    mostrarError(confirmarClave, "La confirmación de la clave es obligatoria");
  } else if (!contraseniaValida(confirmarClaveValor)) {
    mostrarError(
      confirmarClave,
      "La contraseña debe tener al menos 8 caracteres, una mayuscula, una minuscula"
    );
  } else if (claveValor !== confirmarClaveValor) {
    mostrarError(confirmarClave, "Las contraseñas no son iguales");
  } else {
    mostrarCorrecto(confirmarClave);
    validado = true;
  }
  return validado;
};

// Función para gestionar el local storage, así el usuario se pueda registrar si no existe, y en el caso que exista no se pueda registrar
const verificarLocalStorage = () => {
  let estadoLocalStorage = JSON.parse(localStorage.getItem("users")) || [];

  const valorDelCorreo = correo.value.trim();
  const valorDeLaClave = clave.value.trim();

  let existeUsuario = estadoLocalStorage.find(
    (user) => user.correo == valorDelCorreo
  );

  const nuevoUsuario = {
    correo: valorDelCorreo,
    clave: valorDeLaClave,
  };

  if (existeUsuario) {
    modalConfirmacion.classList.add("activar-modal");
    modalConfirmacion.textContent = "Correo ya existente";
    validado = false;
    return;
  } else {
    estadoLocalStorage.push(nuevoUsuario);
    localStorage.setItem("users", JSON.stringify(estadoLocalStorage));
    validado = true;
  }

  return validado;
};

// Formulario con las condiciones para que se pueda hacer el submit
formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  let esEmailValido = verificarEmail();
  let esContraseniaValida = verificarContrasenia();
  let esConfirmacionValida = esIgualAContrasenia();
  let esCorreoExistente = verificarLocalStorage();

  let esValidoElFormulario =
    esEmailValido &&
    esContraseniaValida &&
    esConfirmacionValida &&
    esCorreoExistente;

  if (esValidoElFormulario) {
    modalConfirmacion.classList.add("activar-modal");
    modalConfirmacion.textContent = "Registración realizada con éxito";
    setTimeout(() => {
      formulario.submit();
    }, 1000);
  }
});

// Validación de los inputs en tiempo real
const validacionEnTiempoReal = (fn, delay = 400) => {
  let timeout;
  return (...args) => {
    if (timeout) clearInterval;
    setTimeout(() => {
      fn.apply(null, args);
    }, delay);
  };
};

// Validación de los inputs en tiempo real.
formulario.addEventListener(
  "input",
  validacionEnTiempoReal((e) => {
    switch (e.target.id) {
      case "correo":
        verificarEmail();
        break;

      case "clave":
        verificarContrasenia();
        break;

      case "confirmar-clave":
        esIgualAContrasenia();
        break;
    }
  })
);
