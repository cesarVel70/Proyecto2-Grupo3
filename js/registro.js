const formulario = document.getElementById("login-form");
const correo = document.getElementById("correo");
const clave = document.getElementById("clave");
const confirmarClave = document.getElementById("confirmar-clave");

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
      mostrarCorrecto(clave)
      valid = true;
  }
};

const esIgualAContrasenia = () => {
       let validado = false;
       const claveValor = clave.value.trim();
       const confirmarClaveValor = confirmarClave.value.trim()
       if(!estaVacia(confirmarClaveValor)) {
             mostrarError(confirmarClave, "La confirmación de la clave es obligatoria")
       }else if(!contraseniaValida(confirmarClaveValor)) {
            mostrarError(
              confirmarClave,
              "La contraseña debe tener al menos 8 caracteres, una mayuscula, una minuscula"
            );
       } else if(claveValor !== confirmarClaveValor) {
            mostrarError(confirmarClave, "Las contraseñas no son iguales")
       } else {
             mostrarCorrecto(confirmarClave)
             validado = true
       }
}

const estaVacia = (valor) => (valor == "" ? false : true);

const esEntre = (largo, min, max) => {
  largo < min || largo > max ? false : true;
};

const emailValido = (email) => {
  const re = /^\w+([\.\+\-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
  return re.test(email);
};

const contraseniaValida = (clave) => {
  const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  return re.test(clave);
};

const mostrarError = (input, msj) => {
  const validacion = input.parentElement;
  validacion.classList.remove("correcto");
  validacion.classList.add("error");
  const error = validacion.querySelector("small");
  error.textContent = msj;
};

const mostrarCorrecto = (input) => {
  const validacion = input.parentElement;
  validacion.classList.remove("error");
  validacion.classList.add("correcto");
  const error = validacion.querySelector("small");
  error.textContent = "";
};

formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  let esContraseniaValida = verificarContrasenia();
  let esConfirmacionValida = esIgualAContrasenia()
});
