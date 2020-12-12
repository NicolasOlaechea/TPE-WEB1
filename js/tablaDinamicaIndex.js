document.addEventListener("DOMContentLoaded", iniciarPagina);
function iniciarPagina(){
    "use strict"

    /*CARGAR LA TABLA POR DEFECTO*/
    let series = [
        {
            "posicion": 1,
            "serie": "La casa de papel",
            "genero": "Drama",
            "votos": 21656,
            "calificacion": 9.7
        },
        {
            "posicion": 2,
            "serie": "The last dance",
            "genero": "Documental",
            "votos": 18461,
            "calificacion": 9.5
        },
        {
            "posicion": 3,
            "serie": "Elite",
            "genero": "Drama",
            "votos": 17601,
            "calificacion": 9.2
        },
        {
            "posicion": 4,
            "serie": "Vikings",
            "genero": "Drama",
            "votos": 17426,
            "calificacion": 8.9
        },
        {
            "posicion": 5,
            "serie": "El marginal",
            "genero": "Drama",
            "votos": 15998,
            "calificacion": 8.7 
        },
    ]

    let bodyTabla = document.querySelector("#bodyTabla");

    function completarTabla(){ //Agrego los objetos del arreglo a la tabla, son los valores por defecto que tiene la tabla
        "use strict"
        for(let i= 0; i<series.length; i++){
            bodyTabla.innerHTML += `<tr> 
                                        <td> ${series[i].posicion} </td> 
                                        <td> ${series[i].serie} </td> 
                                        <td> ${series[i].genero} </td> 
                                        <td> ${series[i].votos} </td> 
                                        <td> ${series[i].calificacion} </td> 
                                    </tr>`; 
        }
        resaltarFila(); //Cuando agrega un objeto al arreglo resalta la fila calificacion si cumple la condicion
    }

    completarTabla(); //Cuando carga la pagina completa la tabla con los valores por defecto

    /*AGREGAR UNA FILA A LA TABLA*/
    let botonAgregarSerie = document.querySelector("#botonAgregarSerie");
    botonAgregarSerie.addEventListener("click", agregarSerie);

    function agregarSerie(event){
        "use strict"
        event.preventDefault();
        let serie = { //Objeto serie, con los valores que ingresa el usuario en los input
            "posicion": parseInt(document.querySelector("#inputPosicion").value),
            "nombre": document.querySelector("#inputNombre").value,
            "genero": document.querySelector("#inputGenero").value,
            "votos": parseFloat(document.querySelector("#inputVotos").value),
            "calificacion": parseFloat(document.querySelector("#inputCalificacion").value)
        }

        series.push(serie); //Agrego el objeto al arreglo series
        console.log(series);
            
        bodyTabla.innerHTML += `<tr>
                                     <td> ${serie.posicion} </td>
                                     <td> ${serie.nombre} </td> 
                                     <td> ${serie.genero} </td> 
                                     <td> ${serie.votos} </td> 
                                     <td> ${serie.calificacion} </td> 
                                </tr>`; 
        resaltarFila(); //Cuando agrega un objeto al arreglo resalta la fila calificacion si cumple la condicion

        console.log("Longitud de series, se agrego uno: "+ series.length);
    }

    /*AGREGAR 3 ELEMENTOS*/
    let botonAgregarTresSeries = document.querySelector("#botonAgregarTresSeries");
    botonAgregarTresSeries.addEventListener("click", agregarTresSeries);

    function agregarTresSeries(event){
        "use strict"
        event.preventDefault();
        for(let i=0; i<3; i++){ //Llamo 3 veces a la funcion agregarSerie
            agregarSerie(event);
        }
        console.log("Longitud de series, se agregaron 3: "+ series.length);
    }

    /*VACIAR LA TABLA*/
    let botonVaciarTabla = document.querySelector("#botonVaciarTabla");
    botonVaciarTabla.addEventListener("click", vaciarTabla)

    function vaciarTabla(event){
        "use strict"
        event.preventDefault();
        series.splice(0); //Elimino desde 0 hasta el final del arreglo
        bodyTabla.innerHTML = "";
        console.log("Longitud de series, se vacio: "+ series.length)
    }

    /*RESALTAR FILAS CON CALIFICACION MAYOR O IGUALES A 9*/
    function resaltarFila(){
        "use strict"
        let trs = bodyTabla.getElementsByTagName("tr"); //Traigo los tr del body de la tabla
        for(let i=0; i<series.length; i++){ //Recorro el arreglo series
            if(series[i].calificacion>=9){ //Si la clasificacion de un elemento del arreglo es mayor o igual a 9...
                trs[i].classList.add("resaltarFila"); //Al tr que esta en trs[i] le agrego la clase
            }
        }
    }

}//Cierro inicialPagina()