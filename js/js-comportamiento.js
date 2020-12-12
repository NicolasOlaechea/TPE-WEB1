document.addEventListener("DOMContentLoaded", iniciarPagina);
function iniciarPagina() {
    "use strict"

    //Le asigno los eventos a los botones de la barra de navegacion para el partial render
    let botonInicio = document.querySelector("#botonInicio");
    botonInicio.addEventListener("click", function () {
        cargarContenidoSecciones(urlInicio); //Le paso por parametro la url correspondiente
    })
    let botonPeliculas = document.querySelector("#botonPeliculas");
    botonPeliculas.addEventListener("click", function () {
        cargarContenidoSecciones(urlPeliculas);
    })
    let botonSeries = document.querySelector("#botonSeries");
    botonSeries.addEventListener("click", function () {
        cargarContenidoSecciones(urlSeries);
    })
    let botonRegistro = document.querySelector("#botonRegistro");
    botonRegistro.addEventListener("click", function () {
        cargarContenidoSecciones(urlRegistro);
    })

    //URLs de los html para el partial render
    let urlInicio = "http://localhost/Proyectos/146%20-%20Olaechea%20Nicolas%20Alberto/inicio.html"
    let urlPeliculas = "http://localhost/Proyectos/146%20-%20Olaechea%20Nicolas%20Alberto/peliculas.html";
    let urlSeries = "http://localhost/Proyectos/146%20-%20Olaechea%20Nicolas%20Alberto/series.html";
    let urlRegistro = "http://localhost/Proyectos/146%20-%20Olaechea%20Nicolas%20Alberto/registro.html";

    cargarContenidoSecciones(urlInicio); //Cuando cargo la pagina carga el html de inicio.html

    //PARTIAL RENDER
    function cargarContenidoSecciones(urlPagina) {
        fetch(urlPagina)
            .then(function (response) {
                return response.text();
            })
            .then(function (text) {
                document.querySelector("#contenidoSPA").innerHTML = text;  //Le asigno el html al div vacio

                if (urlPagina === urlInicio) { //Si estoy en el inicio hace todo lo siguiente: Creo y llamo a las funciones
                    let url = "https://web-unicen.herokuapp.com/api/groups/146/series/";

                    setInterval(function(){
                        //Para que no me limpie el filtro cada vez que se auto actualiza
                        if((document.querySelector("#inputFiltro")) && (document.querySelector("#inputFiltro").value === "")){
                            mostrarSeriesEnLaTabla();
                        }
                    }, 2000); //Actualizo la tabla cada 2 segundos

                    //AGREGAR SERIE:-----------------------------------------------------------------------------------------------------
                    function agregarSerie(event) {
                        "use strict"
                        event.preventDefault();

                        let serie = { //Creo un json que despues lo mando en el POST para agregar/subir la serie a la API
                            "thing": {
                                "posicion": parseInt(document.querySelector("#inputPosicion").value),
                                "nombre": document.querySelector("#inputNombre").value,
                                "genero": document.querySelector("#inputGenero").value,
                                "votos": parseFloat(document.querySelector("#inputVotos").value),
                                "calificacion": parseFloat(document.querySelector("#inputCalificacion").value),
                            }
                        }

                        fetch(url, { //Hago un POST
                            "method": "POST",
                            "headers": {
                                "Content-Type": "application/json"
                            },
                            "body": JSON.stringify(serie)
                        })
                            .then(function (respuesta) {
                                if (!respuesta.ok) {
                                    console.log("error");
                                }
                                return respuesta.json()
                            })
                            .then(function (json) {
                                console.log(json);
                                mostrarSeriesEnLaTabla(); //Cuando se hace el POST actualizo la tabla
                            })
                            .catch(function (e) {
                                console.log(e)
                            })
                    }
                    let botonAgregarSerie = document.querySelector("#botonAgregarSerie");
                    botonAgregarSerie.addEventListener("click", agregarSerie);

                    //AGREGAR 3 ELEMENTOS:-----------------------------------------------------------------------------------------------
                    let botonAgregarTresSeries = document.querySelector("#botonAgregarTresSeries");
                    botonAgregarTresSeries.addEventListener("click", function (event) { //Funcion anonima, porque la uso solo para ese boton
                        "use strict"
                        event.preventDefault();
                        for (let i = 0; i < 3; i++) { //Llamo 3 veces a la funcion agregarSerie
                            agregarSerie(event);
                        }
                    });

                    //MOSTRAR LAS SERIES EN LA TABLA:------------------------------------------------------------------------------------
                    function mostrarSeriesEnLaTabla() {
                        fetch(url) //Hago un GET
                            .then(function (response) {
                                return response.json();
                            })
                            .then(function (json) {
                                let bodyTabla = document.querySelector("#bodyTabla");

                                let arrSeries = json.series; //El arreglo de las series que obtengo de la API
                                bodyTabla.innerHTML = " ";
                                for (let i = 0; i < arrSeries.length; i++) {
                                    //Creo el tr:
                                    let tr = document.createElement("tr");
                                    tr.id = arrSeries[i]._id; //Le doy el id al tr
                                    //Creo los td:
                                    let tdPosicion = document.createElement("td");
                                    let tdNombre = document.createElement("td");
                                    let tdGenero = document.createElement("td");
                                    let tdVotos = document.createElement("td");
                                    let tdCalificacion = document.createElement("td");
                                    let tdBotonEditar = document.createElement("td");
                                    let tdBotonEliminar = document.createElement("td");
                                    //Creo los botones (son imagenes):
                                    let botonEditar = document.createElement("img");
                                    let botonEliminar = document.createElement("img");

                                    //Le doy el innerHTML a cada td:
                                    tdPosicion.innerHTML = arrSeries[i].thing.posicion;
                                    tdNombre.innerHTML = arrSeries[i].thing.nombre;
                                    tdGenero.innerHTML = arrSeries[i].thing.genero;
                                    tdVotos.innerHTML = arrSeries[i].thing.votos;
                                    tdCalificacion.innerHTML = arrSeries[i].thing.calificacion;
                                    //Le agrego el url de la imagen al src:
                                    botonEditar.src = "https://image.flaticon.com/icons/svg/598/598234.svg";
                                    botonEliminar.src = "https://image.flaticon.com/icons/svg/1345/1345823.svg";
                                    //Le agrego la clase a los botones, para ajustar el tamaño y otra para seleccionarlos despues:
                                    botonEditar.classList.add("iconosTabla", "botonEditar");
                                    botonEliminar.classList.add("iconosTabla", "botonEliminar");
                                    //Agrego los botones a los td correspondientes:
                                    tdBotonEditar.appendChild(botonEditar);
                                    tdBotonEliminar.appendChild(botonEliminar);

                                    //Agrego todos los td al tr
                                    tr.appendChild(tdPosicion);
                                    tr.appendChild(tdNombre);
                                    tr.appendChild(tdGenero);
                                    tr.appendChild(tdVotos);
                                    tr.appendChild(tdCalificacion);
                                    tr.appendChild(tdBotonEditar);
                                    tr.appendChild(tdBotonEliminar);

                                    //Agrego el tr al body de la tabla
                                    bodyTabla.appendChild(tr);

                                    //Creo un arreglo con los botones eliminar y otro con los botones editar de la tabla
                                    let botonesEditar = tr.querySelectorAll(".botonEditar");
                                    let botonesEliminar = tr.querySelectorAll(".botonEliminar");

                                    //Le asigno un evento a cada boton editar del arreglo
                                    for (let i = 0; i < botonesEditar.length; i++) {
                                        botonEditar.addEventListener("click", editarFila);
                                    }

                                    //Le asigno un evento a cada boton eliminar del arreglo
                                    for (let i = 0; i < botonesEliminar.length; i++) {
                                        botonEliminar.addEventListener("click", eliminarFila);
                                    }

                                }
                                resaltarFila(arrSeries, bodyTabla);
                            })
                            .catch(function (e) {
                                console.log(e);
                            })
                    }

                    //EDITAR FILA: ------------------------------------------------------------------------------------------------------
                    function editarFila() {
                        let idEditar = this.parentNode.parentNode.id; //Guardo el id del tr que contiene al boton que sera clickeado

                        let serie = { //Creo un json que despues lo mando en el PUT para editar la serie en la API
                            "thing": {
                                "posicion": parseInt(document.querySelector("#inputPosicion").value),
                                "nombre": document.querySelector("#inputNombre").value,
                                "genero": document.querySelector("#inputGenero").value,
                                "votos": parseFloat(document.querySelector("#inputVotos").value),
                                "calificacion": parseFloat(document.querySelector("#inputCalificacion").value),
                            }
                        }

                        fetch(url + idEditar, { //Concateno la url y el id del tr que contiene al boton que sera clickeado
                            "method": "PUT",
                            "headers": {
                                "Content-Type": "application/json"
                            },
                            "body": JSON.stringify(serie)
                        })
                            .then(function (response) {
                                return response.json();
                            })
                            .then(function (json) {
                                console.log(json);
                                mostrarSeriesEnLaTabla(); //Cuando se hace el PUT actualizo la tabla
                            })
                            .catch(function (e) {
                                console.log(e);
                            })
                    }

                    //ELIMINAR FILA:-----------------------------------------------------------------------------------------------------
                    function eliminarFila() {
                        let idEliminar = this.parentNode.parentNode.id; //Guardo el id del tr que contiene el boton que sera clickeado
                        fetch(url + idEliminar, { //Concateno la url y el id para hacer el DELETE
                            "method": "DELETE",
                        })
                            .then(function (response) {
                                return response.json();
                            })
                            .then(function (json) {
                                console.log(json);
                                mostrarSeriesEnLaTabla(); //Cuando se hace el DELETE actualizo la tabla
                            })
                            .catch(function (e) {
                                console.log(e);
                            })
                    }

                    //VACIAR TABLA COMPLETA:---------------------------------------------------------------------------------------------
                    /*-HAGO UN GET Y TRAIGO EL ARREGLO DE SERIES
                    -CUANDO TRAIGO EL ARREGLO GUARDO EL ID DE CADA SERIE EN UNA VARIABLE
                    -HAGO UN DELETE A CADA ELEMENTO DEL ARREGLO, CONCATENO LA URL Y EL ID DE CADA OBJETO DEL ARREGLO
                    */
                    let botonVaciarTabla = document.querySelector("#botonVaciarTabla");
                    botonVaciarTabla.addEventListener("click", function (event) { //Funcion anonima, porque la uso solo para ese boton
                        "use strict"
                        event.preventDefault();
                        fetch(url) //Hago un GET
                            .then(function (response) {
                                return response.json();
                            })
                            .then(function (json) {
                                let arrSeries = json.series; //Cuando se hace el GET guardo el arreglo de series que obtengo de la API
                                for (let i = 0; i < arrSeries.length; i++) {
                                    let id = arrSeries[i]._id; //Guardo el id de cada serie en cada iteracion
                                    fetch(url + id, { //Concateno la url y el id de la serie y hago un DELETE para eliminarla
                                        "method": "DELETE",
                                    })
                                        .then(function (response) {
                                            return response.json();
                                        })
                                        .then(function (json) {
                                            console.log(json);
                                            mostrarSeriesEnLaTabla() //Cuando se hace el DELETE actualizo la tabla
                                        })
                                        .catch(function (e) {
                                            console.log(e);
                                        })
                                }
                            })
                    })

                    //RESALTAR FILAS CON CALIFICACION MAYOR O IGUALES A 9----------------------------------------------------------------
                    function resaltarFila(arregloSeries, bodyTabla) {
                        "use strict"
                        let trs = bodyTabla.getElementsByTagName("tr"); //Traigo los tr del body de la tabla
                        for (let i = 0; i < arregloSeries.length; i++) { //Recorro el arreglo series
                            if (arregloSeries[i].thing.calificacion >= 9) { //Si la clasificacion de un elemento del arreglo es mayor o igual a 9...
                                trs[i].classList.add("resaltarFila"); //Al tr que esta en trs[i] le agrego la clase
                            }
                        }
                    }

                    //FILTRO-------------------------------------------------------------------------------------------------------------
                    let inputFiltro = document.querySelector("#inputFiltro");
                    inputFiltro.addEventListener("keyup", filtrarSerie);

                    function filtrarSerie() {
                        let bodyTabla = document.querySelector("#bodyTabla");
                        let trs = bodyTabla.getElementsByTagName("tr");
                        for (let i = 0; i < trs.length; i++) {
                            let tds = trs[i].getElementsByTagName("td"); //Obtengo los td por cada tr
                            if (tds[1].innerHTML.toLowerCase().includes(inputFiltro.value.toLowerCase())) { //Si el innerHTML del nombre contiene lo que esta en el input...
                                trs[i].classList.remove("esconderSeries"); //Le saco la clase "esconderSeries"
                            } else {
                                trs[i].classList.add("esconderSeries"); //Sino se la agrego
                            }
                        }
                    }
                } else if (urlPagina === urlRegistro) { //Si estoy en registro hace lo siguiente:
                    /*Captcha de registro.html */
                    let botonSubmit = document.getElementById("botonSubmit"); //Selecciono el boton del DOM
                    botonSubmit.addEventListener("click", verificarCaptcha); //Le pongo un evento al boton

                    function generarNumeroAlAzar() { //Funcion que retorna un numero al azar
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
                }
            })
    }

    //MENU RESPONSIVE----------------------------------------------------------------------------------------------------
    //Lo pongo fuera de la funcion cargarContenidoSecciones(), porque lo uso en todos los html
    let menuLogo = document.querySelector("#menuLogo");
    menuLogo.addEventListener("click", mostrarBarraNav);

    function mostrarBarraNav() {
        "use strict"
        let barraNav = document.querySelector("#barraNav");
        if (barraNav.classList.contains("barraNavegacion")) {
            barraNav.classList.remove("barraNavegacion");
            barraNav.classList.add("mostrarBarraNav");
        } else if (barraNav.classList.contains("mostrarBarraNav")) {
            barraNav.classList.remove("mostrarBarraNav");
            barraNav.classList.add("barraNavegacion");
        }
    }

}//Cierro inicialPagina()