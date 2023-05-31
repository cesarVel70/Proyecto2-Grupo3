'use strict';
// funciones del formulario de inicio de sesion
let form = document.getElementById("login-form");

form.addEventListener("submit", function(event){
    event.preventDefault(); //evita que se actualice la pagina

    // con estas dos variables obtengo lo que se escriba en correo y contraseña 
    let correo = document.getElementById("correo").value.trim();
    let clave = document.getElementById("clave").value.trim();

    // buscamo dentro del localstorage
    let Users = JSON.parse(localStorage.getItem('users')) || [];

    // buscamos dentro de la variable Users el correo y contraseña que coincidan con el localStorage
    let validacion = Users.find(user => user.correo === correo && user.clave === clave);

    // verificamos el administrador
    if(correo === "admin@admin.com" && clave === "admin"){
        setRol("administrador");
        showAlert('Inicio exitoso, Bienvenido', 'alert-success');
        setTimeout(function() {
            window.location.href = 'admin.html';
        }, 3000);
        // verificamos si el usuario esta registrado
    }else if(!validacion){
        return showAlert('Usuario no registrado y/o datos mal puestos', 'alert-danger');
    }else{
        setRol("usuario");
        showAlert(`Inicio exitoso, Bienvenido ${correo}`, "alert-success");
        setTimeout(function() {
            window.location.href = '/index.html';
        }, 3000);
    }

    //Almacenar el rol administrador o usuario en localStorage
    function setRol(rol) {
        localStorage.setItem("rol", rol);
    }

    // Alert con Bootstrap
    function showAlert(message, alertType) {
        // Crea un elemento de alerta
        const alertElement = document.createElement('div');
        alertElement.className = `alert ${alertType}`;
        alertElement.textContent = message;
    
        // Agrega el elemento de alerta al DOM
        const container = document.getElementById('alert-container');
        container.innerHTML = '';
        container.appendChild(alertElement);
    }
});

// codigo para recuperar contraseña
let CapturarRecuperacion = document.querySelector("#recuperar");

CapturarRecuperacion.addEventListener("click", function(){
    let correoGuardado = prompt("Para recuperar la contraseña, debe ingresar el correo con el cual se registro");
    
    let usuarios = JSON.parse(localStorage.getItem('users')) ||[];
    let buscarCorreo = usuarios.find(usuario => usuario.correo === correoGuardado);

    if(buscarCorreo){
        alert(`la contraseña de este correo es: ${buscarCorreo.clave}`);
    }else {
        alert("Correo no encontrado");
    }
});