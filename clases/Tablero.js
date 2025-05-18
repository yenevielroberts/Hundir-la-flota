
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
    //genera los tableros
    generarTablero() {

        for (let i = 0; i < this.tamano; i++) {

            this.casillas.push([])

            for (let x = 0; x < this.tamano; x++) {
                this.casillas[i].push(new Celda())
            }
        }
    }

    //método que instancia objetos de la clase barco y guardo la info de los barcos
    guardarBarcos(jsonBarcos) {

        let barcos = JSON.parse(jsonBarcos)

        for (let objetos of barcos) {

            let barco = new Barco(objetos["name"], objetos["size"])
            this.listaBarcos.push(barco)

        }
    }

    //método que coloca los barcos de forma aleatoria
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

                //genero posiciones
                let fila = Math.floor(Math.random() * 10)
                let columna = Math.floor(Math.random() * 10)

                if (this.hayEspacio(barco, direccion, fila, columna)) {

                    //Se hara una iteración por cada celda que ocupe un barco
                    for (let x = 0; x < barco.tamano; x++) {


                        if (direccion == "horizontal") {
                            posx = columna + x//incrementa una celda horizontal
                            posY = fila
                        } else if (direccion == "vertical") {
                            posY = fila + x
                            posx = columna
                        }

                        this.casillas[posY][posx].agua = false;//la celda es esa posición estara ocupada
                        this.casillas[posY][posx].posicion.push([posY, posx])//guarda la posicion de esa celda

                        this.casillas[posY][posx].nomBarco = barco.nombre
                        this.casillas[posY][posx].sizeBarco = barco.tamano
                        barco.posiciones.push([posY, posx])
                    }
                    barco.colocado = true
                    colocado = true
                }
            }
        })
    }

    colorcarBarcoUser(columna, fila, direccion, barcoIndex) {

        let colocado = true;
        let objetoBarco = this.listaBarcos[barcoIndex]//obtengo el barco seleccionado por el usuario

        let posX = 0;
        let posY = 0;
        if (objetoBarco.colocado == false) {//sino esta colocado lo coloco

            if (this.hayEspacio(objetoBarco, direccion, fila, columna)) {
                for (let x = 0; x < objetoBarco.tamano; x++) {

                    if (direccion == "horizontal") {
                        posX = columna + x
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
                colocado = false
                console.log("Error. No se puede colocar el barco en esa posición")
            }

        } else {
            colocado = false
            console.log("Este barco ya esta colocado")
        }

        return colocado
    }

    //Método que coloca los barcos de usuario aleatoriamente
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
                            posx = columna + x//incrementa una celda horizontal
                            posY = fila
                        } else if (direccion == "vertical") {
                            posY = fila + x
                            posx = columna
                        }

                        this.casillas[posY][posx].agua = false;//la celda es esa posición estara ocupada

                        this.casillas[posY][posx].posicion.push([posY, posx])//guarda la posicion de esa celda

                        this.casillas[posY][posx].nomBarco = barco.nombre
                        this.casillas[posY][posx].sizeBarco = barco.tamano
                        barco.posiciones.push([posY, posx])

                    }
                    barco.colocado = true
                    colocado = true
                }
            }

        })
    }

    //función que controla donde se puede posicionar los barcos en el tablero 
    hayEspacio(barco, direccion, fila, columna) {

        let espacioLibre = true;

        //Se hara una iteración por cada celda que ocupe un barco
        for (let i = 0; i < barco.tamano; i++) {

            let posx = 0;
            let posY = 0;


            if (direccion == "horizontal") {
                posx = columna + i//incrementa una celda
                posY = fila
            } else if (direccion == "vertical") {
                posY = fila + i
                posx = columna
            }

            //compruebo que no se salga del rango
            if (posx < 0 || posx >= 10 || posY < 0 || posY >= 10) {//si el valor de posx es menor 0 o mayor al numero de columnas en esa fila se sale del tablero
                espacioLibre = false
                break
            }

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

    get listaCeldas() {
        return this.casillas
    }
    get tamano(){
        return this.tamano
    }

    //Método que carga el json, los valores del json sobreescribiran los valores iniciales de la partida
    cargaDeJson(tableroJson) {

        const tablero = JSON.parse(tableroJson)
        this.tamano = tablero.tamano;
        for (let i = 0; i < tablero.casillas.length; i++) {


            for (let j = 0; j < tablero.casillas[i].length; j++) {
                this.casillas[i][j].cargaDeJson(tablero.casillas[i][j])
            }
        }

        for (let x = 0; x < this.listaBarcos.length; x++) {
            this.listaBarcos[x].cargaDeJson(tablero.listaBarcos[x])
        }

    }
}