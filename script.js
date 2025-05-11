import { TableroAi } from "./TableroAi.js";
import { TableroUser } from "./TableroUser.js";

const barcosJson = `[
    { "name": "Portaaviones", "size": 5 },
    { "name": "Acorazado", "size": 4 },
    { "name": "Crucero", "size": 3 },
    { "name": "Submarino", "size": 3 },
    { "name": "Destructor", "size": 2 }
]`


const tableroAi = new TableroAi()
tableroAi.guardarBarcos(barcosJson)
tableroAi.generarTablero()
tableroAi.posicionarBarcos()
const listaCeldasAI = tableroAi.listaCeldas
const listaBarcosAI = tableroAi.listaBarcos

const tableroUser = new TableroUser()
tableroUser.guardarBarcosUser(barcosJson)
tableroUser.generarTableroUser()
const userListabarcos = tableroUser.listaBarcos
const userListaceldas = tableroUser.celdasUser

let barcoName = "";
let direccion = '';

function vistaTableroAI() {
    const contenedor = document.getElementById('contenedor_ai');

    for (let i = 0; i < 10; i++) {

        for (let x = 0; x < 10; x++) {
            let celdaPosicion = `${i}` + `${x}`;

            let celda = document.createElement('div')
            celda.setAttribute("class", "celda_ai")
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

            let celda = document.createElement('div');
            celda.setAttribute("class", "celda_user");
            celda.setAttribute("id", posicionCelda);
            contenedor_user.appendChild(celda);
        }
    }
    return contenedor_user
}

//función activa el tablero de la AI
function activarTableroAi() {
    const celdasTablerblank = document.getElementsByClassName("celda_ai")

    for (let i = 0; i < celdasTablerblank.length; i++) {

        celdasTablerblank[i].addEventListener("click",handlerTableroAI);
        celdasTablerblank[i].style.backgroundColor = "skyblue";
    }
}

function desActivarTableroAI(){
   
     const celdasTablerblank = document.getElementsByClassName("celda_ai")
    for (let i = 0; i < celdasTablerblank.length; i++) {

        celdasTablerblank[i].removeEventListener("click",handlerTableroAI);
    }
}

function handlerTableroAI(event) {
    const celdasTablerblank = document.getElementsByClassName("celda_ai")
    listaCeldasAI

    let celdaIndex = event.target.id
    let fila = parseInt(celdaIndex[0])
    let columna = parseInt(celdaIndex[1])

    if (!listaCeldasAI[fila][columna].agua) {

        let celda = celdasTablerblank[fila * 10 + columna];//se multiplica por 10 ya que el tablero es 10x10
        celda.classList.add("celda_tocada");
        celda.textContent = "🔥";
        celda.removeEventListener("click",handlerTableroAI);
    }else{
        console.log("Solo agua")
        alert("Solo hay agua. Turno de la AI")
    }

}

function turnoDeAI(){
    
}

//activa todos los botones del tablero de usuario
function activarTableroUser() {

    barcoName = "";
    const listaCeldasUser = document.getElementsByClassName("celda_user");
    //Botones
    const btnHorizontal = document.getElementById("horizontal").addEventListener("click", handlerBtnDireccion);
    const btnVertical = document.getElementById("vertical").addEventListener("click", handlerBtnDireccion);
    const btnPortaaviones = document.getElementById("Portaaviones").addEventListener("click", handlerBtnsBarcos)
    const btnAcorazado = document.getElementById("Acorazado").addEventListener("click", handlerBtnsBarcos)
    const btnCrucero = document.getElementById("Crucero").addEventListener("click", handlerBtnsBarcos)
    const btnSubmarino = document.getElementById("Submarino").addEventListener("click", handlerBtnsBarcos)
    const btnDestructor = document.getElementById("Destructor").addEventListener("click", handlerBtnsBarcos)
    for (let x = 0; x < listaCeldasUser.length; x++) {

        listaCeldasUser[x].addEventListener("click", visualizarBarcosUser)
    }
}

//Desactiva todos los botones del tablero de usuario
function desactivarBotones() {
    const listaCeldasUser = document.getElementsByClassName("celda_user");
    //Botones
    const btnHorizontal = document.getElementById("horizontal").removeEventListener("click", handlerBtnDireccion);
    const btnVertical = document.getElementById("vertical").removeEventListener("click", handlerBtnDireccion);
    const btnPortaaviones = document.getElementById("Portaaviones").removeEventListener("click", handlerBtnsBarcos)
    const btnAcorazado = document.getElementById("Acorazado").removeEventListener("click", handlerBtnsBarcos)
    const btnCrucero = document.getElementById("Crucero").removeEventListener("click", handlerBtnsBarcos)
    const btnSubmarino = document.getElementById("Submarino").removeEventListener("click", handlerBtnsBarcos)
    const btnDestructor = document.getElementById("Destructor").removeEventListener("click", handlerBtnsBarcos)
    for (let x = 0; x < listaCeldasUser.length; x++) {

        listaCeldasUser[x].removeEventListener("click", visualizarBarcosUser)
    }
    console.log("botones desactivados")
}

//handler para el botón de dirección
function handlerBtnDireccion(event) {
    direccion = event.target.id
}

//handler para los botones de los barcos 
function handlerBtnsBarcos(event) {
    barcoName = event.target.id
}

//función que muestra los barcos celecionados por el usuario en el tablero
function visualizarBarcosUser(event) {

    if (!barcoName || !direccion) {
        alert("Por favor selecciona un barco y una dirección antes de colocarlo.");
        return;
    }

    const listaCeldashtml = document.getElementsByClassName("celda_user");
    let celdaIndex = event.target.id
    let fila = parseInt(celdaIndex[0])
    let columna = parseInt(celdaIndex[1])

    const barcoIndex = obtenerPosicionBarco(barcoName)//Obtengo el index del barco dentro del array de barcos.

    if (!todosColocados()) {
        if (tableroUser.colorcarBarcoUser(columna, fila, direccion, barcoIndex)) {

            for (let filaIndex = 0; filaIndex < userListaceldas.length; filaIndex++) {

                for (let columnaIndex = 0; columnaIndex < userListaceldas
                [filaIndex].length; columnaIndex++) {

                    if (!userListaceldas[filaIndex][columnaIndex].agua) {

                        let celda = listaCeldashtml[filaIndex * 10 + columnaIndex];//se multiplica por 10 ya que el tablero es 10x10
                        celda.classList.add("celdaUserOcu");
                        celda.textContent = "🚢";
                    }
                }
            }
        } else {
            alert("Error. Este barco ya esta colocado no esta posición no esta disponible")
        }
    } else {
        alert("Todos los barcos ya estan colocados")
        desactivarBotones()
    }
}

//función que comprueba si todos los barcos estan colocados
function todosColocados() {

    let colocados = userListabarcos.every(barco => {
        if (barco.colocado == true) {
            return true
        } else {
            return false
        }
    })
    return colocados
}

/*Función que retorna la posición del barco ()cuyo nombre que se pasa por paramentro) dentro del array */
function obtenerPosicionBarco(nomBarco) {
    let index = userListabarcos.findIndex(barco => {

        if (barco.nombre == nomBarco) {
            return true
        } else {
            return false
        }
    })
    return index
}

function empezarJuego() {
    activarTableroUser()
 activarTableroAi() 



}



vistaTableroAI();
vistaTableroUser();
empezarJuego()

