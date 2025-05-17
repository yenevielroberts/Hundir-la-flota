
import { Barco } from "./Barco.js";
import { Celda } from "./Celda.js";

export class Tablero {
    tamano = 10;
    casillas;
    listaBarcos = [];

    constructor() {
        this.tamano = 10
        this.casillas = []
        this.listaBarcos = []
    
    }
    //genera el tablero de la maquina
    generarTablero() {

        for (let i = 0; i < 10; i++) {

            this.casillas.push([])

            for (let x = 0; x < 10; x++) {
                this.casillas[i].push(new Celda())
            }
        }
    }

    guardarBarcos(jsonBarcos) {

        let barcos = JSON.parse(jsonBarcos)

        for (let objetos of barcos) {

            let barco = new Barco(objetos["name"], objetos["size"])
            this.listaBarcos.push(barco)

        }
    }

     //función que coloca los barcos en el tablero de la maquina
     colocarBarcos() {

        this.listaBarcos.forEach(barco => {

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

                        this.casillas[posY][posx].agua = false;//la celda es esa posición estara ocupada
                        this.casillas[posY][posx].posicion.push([posY, posx])//guarda la posicion de esa celda
                      
                        this.casillas[posY][posx].nomBarco=barco.nombre
                        this.casillas[posY][posx].sizeBarco=barco.tamano
                        barco.posiciones.push([posY, posx])
                    }
                    barco.colocado=true
                    colocado = true
                }
            }
        })
    }

       colorcarBarcoUser(columna, fila, direccion, barcoIndex) {

        let colocado=true;
        let objetoBarco = this.listaBarcos[barcoIndex]//obtengo el barco seleccionado por el usuario

        let posX = 0;
        let posY = 0;
        if (objetoBarco.colocado == false) {

            if (this.hayEspacio(objetoBarco, direccion, fila, columna)) {
                for (let x = 0; x < objetoBarco.tamano; x++) {

                    if (direccion == "horizontal") {
                        posX = (columna) + x
                        posY = fila

                        this.casillas[posY][posX].agua = false;//la celda es esa posición estara ocupada
                        this.casillas[posY][posX].posicion.push([posY, posX])//guarda la posicion de esa celda
                         this.casillas[posY][posX].nomBarco = objetoBarco.nombre
                         this.casillas[posY][posX].sizeBarco = objetoBarco.tamano
                         
                        objetoBarco.posiciones.push([posY, posX])

                    } else if (direccion == "vertical") {
                        posX = fila + x
                        posY = columna

                        this.casillas[posX][posY].agua = false;//la celda es esa posición estara ocupada

                        this.casillas[posX][posY].posicion.push([posX, posY])
                        this.casillas[posX][posY].nomBarco = objetoBarco.nombre
                        this.casillas[posX][posY].sizeBarco = objetoBarco.tamano

                        objetoBarco.posiciones.push([posX, posY])
                        
                    }
                }

                objetoBarco.colocado = true

            } else {
                colocado=false
                console.log("Error. No se puede colocar el barco en esa posición")
            }
            
        } else {
            colocado=false
            console.log("Este barco ya esta colocado")
        }

        return colocado
    }

    ColocarBarcosAleatorio() {

        this.listaBarcos.forEach(barco => {

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
                let fila = Math.floor(Math.random() * 10)
                let columna = Math.floor(Math.random() * 10)


                if (this.hayEspacio(barco, direccion, fila, columna)) {

                    for (let x = 0; x < barco.tamano; x++) {


                        if (direccion == "horizontal") {
                            posx = fila + x//incrementa una celda horizontal
                            posY = columna
                        } else if (direccion == "vertical") {
                            posY = columna + x
                            posx = fila
                        }

                        this.casillas[posY][posx].agua = false;//la celda es esa posición estara ocupada

                        this.casillas[posY][posx].posicion.push([posY, posx])//guarda la posicion de esa celda

                        this.casillas[posY][posx].nomBarco = barco.nombre
                        this.casillas[posY][posx].sizeBarco = barco.tamano
                        barco.posiciones.push([posY, posx])
                        
                    }
                    barco.colocado=true
                    colocado = true
                }
            }

        })
    }

    //función que controla donde se puede posicionar los barcos en el tablero de la maquina
    hayEspacio(barco, direccion, fila, columna) {

        let espacioLibre = true;
        //compruebo posiciones dependiendo si la dirección es vertical o horizontal

        for (let i = 0; i < barco.tamano; i++) {

            let posx = 0;
            let posY = 0;


            if (direccion == "horizontal") {
                posx = fila + i//incrementa una celda
                posY = columna
            } else if (direccion == "vertical") {
                posY = columna + i
                posx = fila
            }

            //compruebo que no se salga del rango
            if (posx < 0 || posx >= 10 || posY < 0 || posY >= 10) {//si el valor de posx es menor 0 o mayor al numero de columnas en esa fila se sale del tablero

                espacioLibre = false

                break
            }
            //console.log(this.#celdas[posY][posx])

            if (this.casillas[posY][posx].agua == false) {
                espacioLibre = false;
                break;
            }
        }
        return espacioLibre

    }

    get listaBarcos() {

        return this.listaBarcos
    }

    get listaCeldas(){
        return this.casillas
    }

    cargaDeJson(tablero){
        this.tamaño = tablero.tamano;
        for (let i = 0; i < this.casillas; i++) {

            this.listaBarcos[i].cargaDeJson(tablero.barcos[i])

            for (let j = 0; j < this.cargaDeJson[i]; j++) {
                this.casillas[i][j].cargaDeJson(tablero.casillas[i][j])
            }
        }

    }
}