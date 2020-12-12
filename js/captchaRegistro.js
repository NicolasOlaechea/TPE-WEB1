document.addEventListener("DOMContentLoaded", iniciarPagina);
function iniciarPagina(){
    "use strict"

    /*Captcha de registro.html */
    let botonSubmit = document.getElementById("botonSubmit"); //Selecciono el boton del DOM
    botonSubmit.addEventListener("click", verificarCaptcha); //Le pongo un evento al boton

    function generarNumeroAlAzar(){ //Funcion que retorna un numero al azar
        "use strict"
        return Math.floor((Math.random() * 10) + 1);
    }

    function asignarNumerosAlAzar() { //Funcion que le asigna los numeros al DOM
        "use strict"
        let primerNumero = document.getElementById("primerNumero"); //Span vacio
        primerNumero.innerHTML = generarNumeroAlAzar(); //El span ahora es un numero al azar
        let segundoNumero = document.getElementById("segundoNumero");
        segundoNumero.innerHTML = generarNumeroAlAzar();
    }
    asignarNumerosAlAzar(); //Cuando carga la ventana, se asignan los numeros al azar

    function verificarCaptcha(event) { //Funcion que verifica lo que ingresa el usuario
        "use strict"
        let suma = parseInt(primerNumero.innerHTML) + parseInt(segundoNumero.innerHTML); //Variable suma (los numeros a azar)
        let inputCaptcha = document.getElementById("inputCaptcha").value; //El valor que ingresa el usuario
        let parrafoResultado = document.getElementById("parrafoResultado"); //El texto que dice si es correcto o no
        event.preventDefault(); //No se envia el formulario
        if (suma == inputCaptcha) { //Si suma es igual lo que ingresa el usuario, se envia el formulario
            document.querySelector("#divCaptcha").classList.remove("captchaSinResolver"); //Quita el fondo blanco del div "captcha"
            document.querySelector("#divCaptcha").classList.remove("captchaIncorrecto"); //Si tiene el fondo rojo, se lo quita
            document.querySelector("#divCaptcha").classList.add("captchaCorrecto"); //Le agrega fondo verde
            parrafoResultado.innerHTML = "El resultado ingresado es correcto, formulario enviado!";
        } else if (suma != inputCaptcha) { //Si suma es distinto a lo que ingresa el usuario...
            document.querySelector("#divCaptcha").classList.remove("captchaSinResolver"); //Quita el fondo blanco del div "captcha"
            document.querySelector("#divCaptcha").classList.add("captchaIncorrecto"); //Le agrega un fondo rojo
            parrafoResultado.innerHTML = "El resultado ingresado es incorrecto";
            asignarNumerosAlAzar(); //Si el usuario se equivoca, los numeros cambiaran.
        }
    }

}//Cierro inicialPagina()