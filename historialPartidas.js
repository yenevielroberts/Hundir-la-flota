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

async function mostrarHistorial() {
    const container = document.getElementById("container");
    let jugadorNombre = prompt("Introduce tu nombre:")

    if (jugadorNombre != null) {

        const datos = await todasLasPartidas()

        const partidas = datos
        partidas.forEach(partida => {
            if (partida.jugador == jugadorNombre) {
                let div = document.createElement("div");
                div.setAttribute("class","infoPartidas")
                div.innerHTML = `
                <p><strong>Nombre jugador:</strong> ${partida.jugador}</p>
                <p><strong> Partida id:</strong> ${partida.id}</p>
                <p><strong>Estado de la partida:</strong> ${partida.estado}</p>
                <p><strong>Ganador:</strong> ${partida.ganador}</p>
                `;
                container.appendChild(div)
            }
        });

    }
}


document.getElementById("btnCargar").addEventListener("click", () => {
    location.href = "index.html";
})

document.getElementById("home").addEventListener("click", () => {
    location.href = "index.html";
})

document.getElementById("nuevoHistorial").addEventListener("click",()=>{

    location.reload()
})

mostrarHistorial()
