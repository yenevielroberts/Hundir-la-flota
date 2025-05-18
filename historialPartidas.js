async function todasLasPartidas() {

    try {
        const response = await fetch(`http://localhost:3000/partidas/`);
        if (!response.ok) throw new Error("No hay partidas que mostrar");

        const data = await response.json();
        console.log("Partida cargada:", data);
        return data;
    } catch (err) {
        console.error("Error:", err);
    }

}

const container = document.getElementById("container");
let jugadorNombre = prompt("Introduce tu nombre:")

if (jugadorNombre != null) {

    const datos = await todasLasPartidas()

    const partidas = datos
    partidas.forEach(partida => {
        if (partida.jugador == jugadorNombre) {
            let div = document.createElement("div");
            div.innerHTML = `
                <p>Nombre jugador: ${partida.jugador}</p>
                <p> partida id: ${partida.id}</p>
                <p>Estado de la partida: ${partida.estado}</p>
                <p>Ganador: ${partida.ganador}</p>
                `;

            container.appendChild(div)
            console.log(partida.id)
        }
    });

}

document.getElementById("btnCargar").addEventListener("click", () => {
    location.href = "index.html";
})

document.getElementById("home").addEventListener("click", () => {
    location.href = "index.html";
})
