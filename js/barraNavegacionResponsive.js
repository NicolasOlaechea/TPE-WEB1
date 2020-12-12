document.addEventListener("DOMContentLoaded", iniciarPagina);
function iniciarPagina(){
    "use strict"

    let menuLogo = document.querySelector("#menuLogo");
    menuLogo.addEventListener("click", mostrarBarraNav);

    function mostrarBarraNav(){
        "use strict"
        let barraNav = document.querySelector("#barraNav");
        if(barraNav.classList.contains("barraNavegacion")){
            barraNav.classList.remove("barraNavegacion");
            barraNav.classList.add("mostrarBarraNav");
        }else if(barraNav.classList.contains("mostrarBarraNav")){
            barraNav.classList.remove("mostrarBarraNav");
            barraNav.classList.add("barraNavegacion");
        }
    }

}//Cierro inicialPagina()