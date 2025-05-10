import { Tablero } from "./TableroAi.js";
import { TableroUser } from "./TableroUser.js";

const barcosJson = `[
    { "name": "Portaaviones", "size": 5 },
    { "name": "Acorazado", "size": 4 },
    { "name": "Crucero", "size": 3 },
    { "name": "Submarino", "size": 3 },
    { "name": "Destructor", "size": 2 }
]`




function vistaTableroAI() {
    const contenedor = document.getElementById('contenedor_ai');

    for (let i = 0; i < 10; i++) {

        for (let x = 0; x < 10; x++) {
            let celdaPosicion = `${i}` + `${x}`;

            let celda = document.createElement('div')
            celda.setAttribute("class", "celda")
            celda.setAttribute("id", celdaPosicion)

            if (listaCeldasAI[i][x].agua == false) {
                //la celda es esa posición estara ocupada
                celda.classList.add("celdaOcupada");
            }
            contenedor.appendChild(celda)
        }
    }
    return contenedor
}


function vistaTableroUser() {
    const contenedor_user = document.getElementById('contenedor_user');

    for (let i = 0; i < 10; i++) {

        for (let x = 0; x < 10; x++) {
            let posicionCelda = `${i}` + `${x}`;

            let celda = document.createElement('div')
            celda.setAttribute("class", "celda_user")
            celda.setAttribute("id", posicionCelda)
            contenedor_user.appendChild(celda)
        }
    }
    return contenedor_user
}

vistaTableroAI();
vistaTableroUser();