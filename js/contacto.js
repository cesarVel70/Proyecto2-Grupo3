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
        desplegable.style.display = "none"
    }
}


