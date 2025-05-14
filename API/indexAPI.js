/***
 * CONEXIÓN A API
 */

import { tableroIA } from "../script.js";
import { tableroJugador } from "../script.js";

async function guardarPartida(nombreJugador, tableroJugador, tableroIA, idPartida) {
    const partida = {
        //DEBES DEFINIR AQUí LO QUE QUIERAS QUE TENGAS QUE GUARDAR
        id: idPartida,
        jugador: nombreJugador,
        tableroJugador: tableroJugador,
        tableroIA: tableroIA
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

    //DEFINE AQUI LO QUE QUIERAS, PUEDES AÑADIR MAS PARAMETROS
    guardarPartida(nombreJugador, tableroJugador, tableroIA);
});

document.getElementById("btnCargar").addEventListener("click", async () => {
    const id = prompt("Introduce el ID de la partida:");
    const partida = await cargarPartida(id);
    // Llamamos a la función que recupera los tableros 

    // PROGRAMAR
    recuperaTablerosApi(partida);
});

function recuperaTablerosApi(partida) {

    const celdasHTML = document.getElementsByClassName("celda_ai");
    const tableroAI = JSON.parse(partida.tableroIA)//Convierto objecto javascript el json de tableroJugador
    const tamano = tableroAI.tamaño
    const casillasAI = tableroAI["casillas"]//las casillas del json, es una matrix de objetos

    const tableroJugador = JSON.parse(partida.tableroJugador)

    //Tablero AI
    for (let x = 0; x < casillasAI.length; x++) {

        for (let i = 0; i < casillasAI[x].length; i++) {

            let casillArray = casillasAI[x][i];
            let fila = casillArray.x;
            let columna = casillArray.y;
            let celda = celdasHTML[fila * 10 + columna];

            if (casillArray.ocupada == true) {
                celda.classList.add("celda_ocupada")
                //celda.textContent = "H";

            } else if (casillArray.impactada == true) {
                celda.textContent = "🔥";
            }
        }
    }
}
