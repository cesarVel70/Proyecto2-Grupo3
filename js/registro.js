const formulario = document.getElementById("login-form");
const correo = document.getElementById("correo");
const clave = document.getElementById("clave");
const confirmarClave = document.getElementById("confirmar-clave");
const modalConfirmacion = document.querySelector(".agregar-modal");

const verificarEmail = () => {
      let validado = false;
      const correoValor = correo.value.trim();
      if(!estaVacia(correoValor)) {
            mostrarError(correo, "El correo electrónico es obligatorio")
      } else if(!emailValido(correoValor)) {
            mostrarError(correo, "El correo no es válido")
      } else {
            mostrarCorrecto(correo)
            validado = true
      }
      return validado
}

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
      validado = true;
  }
  return validado;
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
       return validado;
}

const estaVacia = (valor) => (valor == "" ? false : true);

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

const verificarLocalStorage = () => {
       
      let estadoLocalStorage =
      JSON.parse(localStorage.getItem("datosFormulario")) || [];
      
      const valorDelCorreo = correo.value.trim()
      const valorDeLaClave = clave.value.trim()
      
      let existeUsuario = estadoLocalStorage.find((user) => user.correo == valorDelCorreo);
      
      const nuevoUsuario = {
            correo: valorDelCorreo,
            clave: valorDeLaClave,
      }
      
      if (existeUsuario) {
            modalConfirmacion.classList.add("activar-modal");
            modalConfirmacion.textContent = "Correo ya existente";
            validado = false
            return;
      } else {
            estadoLocalStorage.push(nuevoUsuario);
            localStorage.setItem(
                  "datosFormulario",
              JSON.stringify(estadoLocalStorage)
            );    
            validado = true
      }

      return validado
}
      
      
      
      
      formulario.addEventListener("submit", (e) => {
            e.preventDefault();
      let esEmailValido = verificarEmail();
      let esContraseniaValida = verificarContrasenia();
      let esConfirmacionValida = esIgualAContrasenia();
      let esCorreoExistente = verificarLocalStorage();

      let esValidoElFormulario = esEmailValido && esContraseniaValida && esConfirmacionValida && esCorreoExistente

      if(esValidoElFormulario) {
            modalConfirmacion.classList.add("activar-modal")
            modalConfirmacion.textContent = "Registración realizada con éxito"
            setTimeout(() => {
                  formulario.submit();
            }, 1000);
      }
});

const validacionEnTiempoReal = (fn, delay = 400) => {
      let timeout;
      return(...args) => {
            if(timeout) clearInterval;
            setTimeout(() => {
                  fn.apply(null, args)
            }, delay);
      }
}

formulario.addEventListener("input", validacionEnTiempoReal((e) => {
      switch (e.target.id) {
            case "correo":
                  verificarEmail()
                  break;
      
            case "clave":
                  verificarContrasenia()
                  break;

            case "confirmar-clave": 
                  esIgualAContrasenia()
                  break;
      }
}))