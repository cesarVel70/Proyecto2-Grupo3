// rol administrador
document.addEventListener("DOMContentLoaded", function () {
    // Verificar el rol de administrador
    let rol = localStorage.getItem("rol");
    if (rol === "administrador") {
        // Mostrar el botón de cerrar sesión
        let cerrarSesion = document.getElementById("cerrarSesion");
        cerrarSesion.innerHTML = "| Cerrar Sesión |";
        let etiqueta = document.getElementById("etiqueta")
        etiqueta.innerHTML = 'Administrador';
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
            window.location.href = "contacto.html";
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
            window.location.href = "contacto.html";
        });
    }
});

//funciones del formulario

//defino las variables necesarias
let motivo = document.getElementById('motivo');
let desplegable = document.getElementById('desplegable');

//añado escuchador de evento para conocer que opcion se elije
motivo.addEventListener('click', eleccion);

//utilizo una funcion para correr el escuchador de evento
function eleccion(e){
    e.preventDefault();
    //guardo el valor de la opcion elegida
    const opcion = e.target.value;
    //de acuerdo al valor de la opcion, aparezco o desaparezco el input
    if(opcion == 4){
        desplegable.style.display = "block";
    }else if(opcion != 4){
        desplegable.style.display = "none";
    };
};

//verificacion

const formulario = document.getElementById("formulario");
const inputs = document.querySelectorAll("#formulario input");

const expresiones = {
    apellido: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
    telefono: /^\d{7,14}$/,
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
};

const campos = {
    nombre: false,
    apellido: false,
    correo: false,
    telefono: false
}

const validarFormulario = (e) => {
    switch (e.target.name){
        case "nombre":
            if(expresiones.nombre.test(e.target.value)){
                document.getElementById('grupo_nombre').classList.remove('input-group-incorrecto');
                campos['nombre'] = true;
            } else {
                document.getElementById('grupo_nombre').classList.add('input-group-incorrecto');
                campos['nombre'] = false;
            }
        break;
        case "apellido":
            if(expresiones.apellido.test(e.target.value)){
                document.getElementById('grupo_apellido').classList.remove('input-group-incorrecto');
                campos['apellido'] = true;
            } else {
                document.getElementById('grupo_apellido').classList.add('input-group-incorrecto');
                campos['apellido'] = false;
            }
        break;
        case "email":
            if(expresiones.correo.test(e.target.value)){
                document.getElementById('grupo_email').classList.remove('input-group-incorrecto');
                campos['email'] = true;
            } else {
                document.getElementById('grupo_email').classList.add('input-group-incorrecto');
                campos['email'] = false;
            }
        break;
        case "telefono":
            if(expresiones.telefono.test(e.target.value)){
                document.getElementById('grupo_telefono').classList.remove('input-group-incorrecto');
                campos['telefono'] = true;
            } else {
                document.getElementById('grupo_telefono').classList.add('input-group-incorrecto');
                campos['telefono'] = false;
            }
        break;
    }
}

formulario.addEventListener('submit',(e) => {

    if(campos.apellido && campos.email && campos.nombre && campos.telefono){
        document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
        setTimeout(() =>{
            document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
            formulario.submit();
        }, 5000)
    }else{
        document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo')
        e.preventDefault();
        setTimeout(() =>{
            document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');
            
        }, 5000)
    }
})

inputs.forEach((input) =>{
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
});
