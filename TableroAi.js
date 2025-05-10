import { Barco } from "./Barco.js";
import { Celda } from "./Celda.js";

export class Tablero {
    #tamano = 10;
    #celdas;
    #listaBarcos = [];

    constructor() {
        this.#tamano = 10
        this.#celdas = []
        this.#listaBarcos = []
    }

    //genera el tablero de la maquina
    generarTablero() {

        for (let i = 0; i < 10; i++) {

            this.#celdas.push([])

            for (let x = 0; x < 10; x++) {
                this.#celdas[i].push(new Celda())
            }
        }
    }

    guardarBarcos(jsonBarcos) {

        let barcos = JSON.parse(jsonBarcos)

        for (let objetos of barcos) {

            let barco = new Barco(objetos["name"], objetos["size"])
            this.#listaBarcos.push(barco)

        }
    }

     //función que coloca los barcos en el tablero de la maquina
     posicionarBarcos() {

        this.#listaBarcos.forEach(barco => {

            let colocado = false;
            while (!colocado) {

                let posx = 0;  //numero de celda que generado por el aumento del numero de la celda original
                let posY = 0;

                let direccionRandom = Math.floor(Math.random() * 2)
                let direccion = ""

                if (direccionRandom === 0) {
                    direccion = "vertical"
                } else if (direccionRandom === 1) {
                    direccion = "horizontal"
                }

                //genero posiciones y dirección
                let posicionY = Math.floor(Math.random() * 10)
                let posicionX = Math.floor(Math.random() * 10)

                if (this.hayEspacio(barco, direccion, posicionX, posicionY)) {

                    for (let x = 0; x < barco.tamano; x++) {


                        if (direccion == "horizontal") {
                            posx = posicionX + x//incrementa una celda horizontal
                            posY = posicionY
                        } else if (direccion == "vertical") {
                            posY = posicionY + x
                            posx = posicionX
                        }

                        this.#celdas[posY][posx].agua = false;//la celda es esa posición estara ocupada
                        this.#celdas[posY][posx].posicion.push([posY, posx])//guarda la posicion de esa celda
                      
                        
                        this.#celdas[posY][posx].nomBarco=barco.nombre
                        this.#celdas[posY][posx].sizeBarco=barco.tamano
                        barco.posiciones.push([posx, posY])
                    }
                    colocado = true
                }
            }
        })
    }


    //función que controla donde se puede posicionar los barcos en el tablero de la maquina
    hayEspacio(barco, direccion, posicionX, posicionY) {

        let espacioLibre = true;
        //compruebo posiciones dependiendo si la dirección es vertical o horizontal

        for (let i = 0; i < barco.tamano; i++) {

            let posx = 0;
            let posY = 0;


            if (direccion == "horizontal") {
                posx = posicionX + i//incrementa una celda
                posY = posicionY
            } else if (direccion == "vertical") {
                posY = posicionY + i
                posx = posicionX
            }

            //compruebo que no se salga del rango
            if (posx < 0 || posx >= 10 || posY < 0 || posY >= 10) {//si el valor de posx es menor 0 o mayor al numero de columnas en esa fila se sale del tablero

                espacioLibre = false

                break
            }
            //console.log(this.#celdas[posY][posx])

            if (this.#celdas[posY][posx].agua == false) {
                espacioLibre = false;
                break;
            }
        }
        return espacioLibre

    }

    get listaBarcos() {

        return this.#listaBarcos
    }

    get listaCeldas(){
        return this.#celdas
    }
}