import { Tablero } from "./Tablero.js";
import { TableroUser } from "./TableroUser.js";


const barcosJson = `[
    { "name": "Portaaviones", "size": 5 },
    { "name": "Acorazado", "size": 4 },
    { "name": "Crucero", "size": 3 },
    { "name": "Submarino", "size": 3 },
    { "name": "Destructor", "size": 2 }
]`


const tableroIA = new Tablero()
tableroIA.guardarBarcos(barcosJson)
tableroIA.generarTablero()
tableroIA.colocarBarcos()
const listaCeldasIA = tableroIA.listaCeldas
const listaBarcosIA = tableroIA.listaBarcos

const tableroJugador = new Tablero()
tableroJugador.guardarBarcos(barcosJson)
tableroJugador.generarTablero()
const userListabarcos = tableroJugador.listaBarcos
const userListaceldas = tableroJugador.listaCeldas


let barcoName = "";
let direccion = '';

function vistaTableros() {
    const contenedor = document.getElementById('contenedor_ai');
    const contenedor_user = document.getElementById('contenedor_user');

    for (let i = 0; i < 10; i++) {

        for (let x = 0; x < 10; x++) {
            let celdaPosicion = `${i}` + `${x}`;

            let celdaIA = document.createElement('div')
            celdaIA.setAttribute("class", "celda_ai")
            celdaIA.setAttribute("id", celdaPosicion)

            let celdaUser = document.createElement('div');
            celdaUser.setAttribute("class", "celda_user");
            celdaUser.setAttribute("id", celdaPosicion);


            if (listaCeldasIA[i][x].agua == false) {
                //la celda es esa posición estara ocupada
                celdaIA.classList.add("celdaOcupada");
            }
            contenedor.appendChild(celdaIA);
            contenedor_user.appendChild(celdaUser);
        }
    }
    //return contenedor
}



//función activa el tablero de la AI, que se pueda jugar
export function activarTableroAi() {
    const celdasTablerblank = document.getElementsByClassName("celda_ai")

    for (let i = 0; i < celdasTablerblank.length; i++) {

        celdasTablerblank[i].addEventListener("click", handlerTableroAI);
        celdasTablerblank[i].style.backgroundColor = "skyblue";
    }
}

function desActivarTableroAI() {

    const celdasTablerblank = document.getElementsByClassName("celda_ai")
    for (let i = 0; i < celdasTablerblank.length; i++) {

        celdasTablerblank[i].removeEventListener("click", handlerTableroAI);
    }
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
    const btnAleatorio = document.getElementById("aleatorio").addEventListener("click", colocarbarcosUserAleatorio)

    for (let x = 0; x < listaCeldasUser.length; x++) {

        listaCeldasUser[x].addEventListener("click", visualizarBarcosUser)
    }
}

//función que muestra los barcos celecionados por el usuario en el tablero
function visualizarBarcosUser(event) {

    const btnAleatorio = document.getElementById("aleatorio").removeEventListener("click", colocarbarcosUserAleatorio);

    if (!barcoName || !direccion) {
        alert("Por favor selecciona un barco y una dirección antes de colocarlo.");
        return;
    }

    const listaCeldashtml = document.getElementsByClassName("celda_user");
    let celdaIndex = event.target.id
    let fila = parseInt(celdaIndex[0])
    let columna = parseInt(celdaIndex[1])

    const barcoIndex = obtenerPosicionBarco(barcoName)//Obtengo el index del barco dentro del array de barcos.
    if (tableroJugador.colorcarBarcoUser(columna, fila, direccion, barcoIndex)) {

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

    if (todosColocados()) {
        alert("Empienza el juego")
        activarTableroAi()
        desactivarBotones()
    }

}

function handlerTableroAI(event) {

    if (comprobarGanador()) {
        desActivarTableroAI()
    } else {


        const celdasTablerblank = document.getElementsByClassName("celda_ai")

        let celdaIndex = event.target.id
        let fila = parseInt(celdaIndex[0])
        let columna = parseInt(celdaIndex[1])
        let juegaAI = false;

        if (!listaCeldasIA[fila][columna].agua) {

            listaCeldasIA[fila][columna].tocado = "barco"
            let celda = celdasTablerblank[fila * 10 + columna];//se multiplica por 10 ya que el tablero es 10x10
            celda.classList.add("celda_tocada");
            celda.textContent = "🔥";
            celda.removeEventListener("click", handlerTableroAI);

            let indexBarcoTocado = obtenerPosicionBarco(listaCeldasIA[fila][columna].nomBarco)

            if (comprobarHundimientoBarco(listaBarcosIA[indexBarcoTocado], listaCeldasIA)) {
                listaBarcosIA[indexBarcoTocado].hundido = true
                alert("Barco: " + listaCeldasIA[fila][columna].nomBarco + " hundido")


            }


        } else {
            listaCeldasIA[fila][columna].tocado = "agua"
            //alert("Solo hay agua. Turno de la AI")
            let celda = celdasTablerblank[fila * 10 + columna];//se multiplica por 10 ya que el tablero es 10x10
            celda.classList.add("agua")
            celda.textContent = "🌊";


            do {
                juegaAI = turnoDeAI()

            } while (juegaAI);

        }
    }

}

function turnoDeAI() {

    if (comprobarGanador()) {
        desActivarTableroAI()

    } else {

        let acertado = false;

        // Elegir una celda aleatoria
        let fila = Math.floor(Math.random() * 10);
        let columna = Math.floor(Math.random() * 10);

        let celda = userListaceldas[fila][columna];
        console.log(celda)

        if (celda.agua == true && celda.tocado == "") {
            celda.tocado = "agua";

            //mensajeJuegaDeNuevo
            const celdaHTML = document.getElementById(`${fila}` + `${columna}`)
            celdaHTML.classList.add("agua")
            celdaHTML.textContent = "🌊";

        } else if (celda.agua == false) {
            celda.tocado = "barco";
            acertado = true
            const celdaHTML = document.getElementById(`${fila}` + `${columna}`);

            celdaHTML.classList.add("celda_tocada");
            celdaHTML.textContent = "🔥";

            let indexBarcoTocado = obtenerPosicionBarco(celda.nomBarco)
            if (comprobarHundimientoBarco(userListabarcos[indexBarcoTocado], userListaceldas)) {
                userListabarcos[indexBarcoTocado].hundido = true
                alert("Barco: " + celda.nomBarco + " hundido")

            }
        }

        return acertado
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
    const btnAleatorio = document.getElementById("aleatorio").removeEventListener("click", colocarbarcosUserAleatorio);
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


function colocarbarcosUserAleatorio() {
    desactivarBotones()

    tableroJugador.ColocarBarcosAleatorio()
    const listaCeldashtml = document.getElementsByClassName("celda_user");
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

    if (todosColocados()) {
        alert("Empienza el juego")
        activarTableroAi()
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


function comprobarHundimientoBarco(barco, listaCeldas) {
    // Recorro las posiciones del barco y miro si las celdas en la que esta ha sido tocado.
    let celdasTocadas = 0;

    for (let i = 0; i < barco.posiciones.length; i++) {

        let pos = barco.posiciones[i];
        let fila = pos[0];
        let columna = pos[1];
        let celda = listaCeldas[fila][columna];

        if (celda.tocado == "barco") {
            celdasTocadas += 1//por cada celda tocada se incrementa

        }
    }

    if (celdasTocadas == barco.posiciones.length) {//si el número de celdas es igual al tamaño del array qur guarda las posciones el barco esta hundido
        return true
    } else {
        return false
    }
}

function comprobarGanador() {
    const userPerdedor = userListabarcos.every(barco => {
        if (barco.hundido == true) {
            return true
        } else {
            return false
        }
    })
    const aiPerdedor = listaBarcosIA.every(barco => {
        if (barco.hundido == true) {
            return true
        } else {
            return false
        }
    })

    if (userPerdedor) {
        alert("Has Perdido")
    } else if (aiPerdedor) {

        //funcion para mostrar conffeti
        confetti({
            particleCount: 500,
            spread: 70,
            origin: { y: 0.6 },
        });

    }

    if (!userPerdedor && !aiPerdedor) {
        return false
    } else {
        const btnNuevaPartida = document.getElementById("btnNuevaPartida");
        const btnGuardarPartida = document.getElementById("btnGuardar");
        btnNuevaPartida.disabled = false;
        btnNuevaPartida.style.display = "block";
        btnGuardarPartida.disabled = false;
        btnGuardarPartida.style.display = "block";


        btnNuevaPartida.addEventListener("click", () => {
            location.reload();
        })


        return true
    }
}

function empezarPartida() {

}
vistaTableros();
activarTableroUser();



//////////
async function guardarPartida(nombreJugador, tableroJugador, tableroIA, idPartida) {


    const partida = {
        //DEBES DEFINIR AQUí LO QUE QUIERAS QUE TENGAS QUE GUARDAR
        id: idPartida,
        jugador: nombreJugador,
        tableroJugador: JSON.stringify(tableroJugador),
        tableroIA: JSON.stringify(tableroIA)
    };

    try {
        const response = await fetch("http://localhost:3000/partidas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(partida)
        });

        if (!response.ok) throw new Error("Error al guardar la partida");

        const data = await response.json();
        console.log("Partida guardada con éxito:", data);
        return data.id; // ID de la partida
    } catch (err) {
        console.error("Error:", err);
    }
}


async function cargarPartida(idPartida) {
    try {
        const response = await fetch(`http://localhost:3000/partidas/${idPartida}`);
        if (!response.ok) throw new Error("No se encontró la partida");

        const data = await response.json();
        //console.log("Partida cargada:", data);
        return data;
    } catch (err) {
        console.error("Error:", err);
    }
}

document.getElementById("btnGuardar").addEventListener("click", () => {
    console.log("dentro del eventlistner")
    const nombreJugador = prompt("Introduce tu nombre:");

    if (nombreJugador != null) {
        //DEFINE AQUI LO QUE QUIERAS, PUEDES AÑADIR MAS PARAMETROS
        guardarPartida(nombreJugador, tableroJugador, tableroIA);
    }


});

document.getElementById("btnCargar").addEventListener("click", async () => {
    const id = prompt("Introduce el ID de la partida:");


    if (id != null) {
        const partida = await cargarPartida(id);
        // Llamamos a la función que recupera los tableros 
        // PROGRAMAR
        recuperaTablerosApi(partida);
    }

});

function recuperaTablerosApi(partida) {

    const celdasUserHTML = document.getElementsByClassName("celda_user");
    const iaCeldasHTML = document.getElementsByClassName("celda_ai");

    tableroIA.cargaDeJson(partida.tableroIA)//Convierto objecto javascript el json de tableroJugador
    //console.log(tableroIA)
    tableroJugador.cargaDeJson(partida.tableroJugador)
    console.log(tableroIA.casillas)

    //Tablero Jugador
    for (let fila = 0; fila < userListaceldas.length; fila++) {

        for (let columna = 0; columna < userListaceldas[fila].length; columna++) {

            //User
            let casillasUser = userListaceldas[fila][columna];
            let celdaUser = celdasUserHTML[fila * 10 + columna];

            //IA
            let casillasIa = listaCeldasIA[fila][columna];
            let celdasIa = iaCeldasHTML[fila * 10 + columna];
            celdasIa.classList.remove("celdaOcupada")
            if (casillasIa.agua == false) {
                celdasIa.classList.add("celdaOcupada");
            }

            if (casillasUser.agua == false && casillasUser.tocado == "") {
                //celdasIa.classList.add("celdaOcupada")
                celdaUser.classList.add("celdaUserOcu")
                celdaUser.textContent = "🚢";

            } else if (casillasUser.tocado == "barco") {
                celdaUser.classList.add("celdaUserOcu")
                celdaUser.classList.add("celda_tocada");
                celdaUser.textContent = "🔥";

            } else if (casillasUser.tocado == "agua") {
                celdaUser.classList.add("agua");
                celdaUser.textContent = "🌊";
            }


            if (casillasIa.tocado == "agua") {
                //Ia
                celdasIa.classList.add("agua");
                celdasIa.textContent = "🌊";
            } else if (casillasIa.tocado == "barco") {
                //IA
                celdasIa.classList.add("celda_tocada");
                celdasIa.textContent = "🔥";
            }


        }
    }

    desactivarBotones()
    activarTableroAi()

}




