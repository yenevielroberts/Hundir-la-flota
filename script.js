import { TableroAi } from "./TableroAi.js";
import { TableroUser } from "./TableroUser.js";

const barcosJson = `[
    { "name": "Portaaviones", "size": 5 },
    { "name": "Acorazado", "size": 4 },
    { "name": "Crucero", "size": 3 },
    { "name": "Submarino", "size": 3 },
    { "name": "Destructor", "size": 2 }
]`


const tableroAi=new TableroAi()
tableroAi.guardarBarcos(barcosJson)
tableroAi.generarTablero()
tableroAi.posicionarBarcos()
const listaCeldasAI = tableroAi.listaCeldas
const listaBarcosAI=tableroAi.listaBarcos

const tableroUser=new TableroUser()
tableroUser.guardarBarcosUser(barcosJson)
tableroUser.generarTableroUser()
const userListabarcos=tableroUser.listaBarcos
const userListaceldas=tableroUser.celdasUser

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


function activarTableroAi(){
     const celdasTablerblank = document.getElementsByClassName("celda_ai")

        for (let i = 0; i < celdasTablerblank.length; i++) {

            celdasTablerblank[i].addEventListener("click",()=>{

            });
            celdasTablerblank[i].style.backgroundColor = "skyblue";
        }
}

function activarTableroUser(){

    const listaCeldasUser=document.getElementsByClassName("celda_user");
    
    for(let x=0; x<listaCeldasUser.length;x++){

        listaCeldasUser[x].addEventListener("click",visualizarBarcosUser)
    }
}


function visualizarBarcosUser(event){
    let celdaIndex=event.target.id
    let fila=celdaIndex[0]
    let columna=celdaIndex[1]
    const btnHorizontal=document.getElementById("horizontal").addEventListener("click",handlerBtnDireccion);
    const btnVertical=document.getElementById("vertical").addEventListener("click",handlerBtnDireccion);
    let direccion="";
    const handlerBtnDireccion=(event)=>{
        direccion=event.target.id

    }

    console.log("fila: " +fila+" Columna: "+columna)

    tableroUser
    userListaceldas[fila][columna].agua=false

}


/*Función que retorna la posición del barco() nombre que se pasa por paramentro) dentro del array */
function obtenerPosicionBarco(nomBarco) {
    let index = listaBarcosUser.findIndex(barco => {

        if (barco.nombre == nomBarco) {
            return true
        } else {
            return false
        }
    })

    return index
}

function empezarJuego(){

    activarTableroUser()

}
vistaTableroAI();
vistaTableroUser();
empezarJuego()

