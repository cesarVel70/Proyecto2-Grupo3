'use strict';

document.getElementById("login-form").addEventListener("submit", function(event){
    event.preventDefault(); //evita que se actualice la pagina

    // con estas dos variables obtengo lo que se escriba en correo y contraseña 
    let nombre = document.getElementById("correo").value;
    let contrasenia = document.getElementById("clave").value;

    // pendiente de modificacion, segun cual sea la key en el registro
    let Users = JSON.parse(localStorage.getItem('users')) || [];

    // buscamos dentro de la variable Users el correo y contraseña que coincidan con el localStorage
    let validacion = Users.find(user => user.nombre === nombre && user.contrasenia === contrasenia);

    // verificamos el administrador
    if(nombre === "admin@admin.com" && contrasenia === "admin"){
        showAlert('Inicio exitoso, Bienvenido', 'alert-success');
        setTimeout(function() {
            window.location.href = 'admin.html';
        }, 3000);
        // verificamos si el usuario esta registrado
    }else if(!validacion){
        return showAlert('Usuario no registrado y/o datos mal puestos', 'alert-danger');
    }else{
        showAlert(`Inicio exitoso, Bienvenido ${validacion.nombre}, 'alert-success'`);
        setTimeout(function() {
            window.location.href = 'index.html';
        }, 3000);
    }

    // prueba de alertas con bootstrap
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

let CapturarRecuperacion = document.querySelector("#recuperar");

CapturarRecuperacion.addEventListener("click", function(){
    let correoGuardado = prompt("Para recuperar la contraseña, debe ingresar el correo con el cual se registro");
    
    let usuarios = JSON.parse(localStorage.getItem('users')) ||[];
    let buscarCorreo = usuarios.find(usuario => usuario.nombre === correoGuardado);

    if(buscarCorreo){
        alert(`la contraseña de este correo es: ${buscarCorreo.contrasenia}`);
    }else {
        alert("Correo no encontrado");
    }

})