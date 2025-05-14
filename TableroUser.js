import { Barco } from "./Barco.js";
import { Celda } from "./Celda.js";



export class TableroUser {
    #tamano = 10;
    #celdasUser;
    #listaBarcosUser = [];

    constructor() {
        this.#tamano = 10
        this.#celdasUser = []
        this.#listaBarcosUser = [];
    }

    generarTableroUser() {

        for (let i = 0; i < this.#tamano; i++) {

            this.#celdasUser.push([])

            for (let x = 0; x < this.#tamano; x++) {
                this.#celdasUser[i].push(new Celda())
            }
        }
    }

    guardarBarcosUser(jsonBarcos) {

        let barcos = JSON.parse(jsonBarcos)

        for (let objetos of barcos) {

            let barco = new Barco(objetos["name"], objetos["size"])
            this.#listaBarcosUser.push(barco)
        }
    }

    colorcarBarcoUser(CeldaUserCol, celdaUserFil, direccion, barcoIndex) {

        let colocado=true;
        let objetoBarco = this.#listaBarcosUser[barcoIndex]//obtengo el barco seleccionado por el usuario

        let posX = 0;
        let posY = 0;
        if (objetoBarco.colocado == false) {

            if (this.#hayEspacioTableroUser(objetoBarco, direccion, celdaUserFil, CeldaUserCol)) {
                for (let x = 0; x < objetoBarco.tamano; x++) {

                    if (direccion == "horizontal") {
                        posX = (CeldaUserCol) + x
                        posY = celdaUserFil

                        this.#celdasUser[posY][posX].agua = false;//la celda es esa posición estara ocupada
                        this.#celdasUser[posY][posX].posicion.push([posY, posX])//guarda la posicion de esa celda
                         this.#celdasUser[posY][posX].nomBarco = objetoBarco.nombre
                         this.#celdasUser[posY][posX].sizeBarco = objetoBarco.tamano
                         
                        objetoBarco.posiciones.push([posY, posX])

                    } else if (direccion == "vertical") {
                        posX = celdaUserFil + x
                        posY = CeldaUserCol

                        this.#celdasUser[posX][posY].agua = false;//la celda es esa posición estara ocupada

                        this.#celdasUser[posX][posY].posicion.push([posX, posY])
                        this.#celdasUser[posX][posY].nomBarco = objetoBarco.nombre
                        this.#celdasUser[posX][posY].sizeBarco = objetoBarco.tamano

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

    #hayEspacioTableroUser(barco, direccion, fila, columna) {

        let espacioLibre = true;
        for (let x = 0; x < barco.tamano; x++) {

            let posX = 0;
            let posY = 0;
            if (direccion == "horizontal") {

                posX = columna + x // desplazamiento en la columna
                posY = fila // fila permanece constante

            } else if (direccion == "vertical") {
                posY = fila + x
                posX = columna
            }

            if (posX < 0 || posX >=10 || posY < 0 || posY >=10) {

                console.log("no hay espacio supera el número")
                espacioLibre = false
                break
            }
            if (this.#celdasUser[posY][posX].agua == false) {
                console.log("la celda esta ocupada")
                espacioLibre = false
                break;
            }/* else if (this.#celdasUser[posX][posY].agua == false) {
                console.log("la celda esta ocupada")
                espacioLibre = false
                break;
            }*/

            
        }
        return espacioLibre
    }

    ColocarBarcosAleatorio() {

        this.#listaBarcosUser.forEach(barco => {

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


                if (this.#hayEspacioTableroUser(barco, direccion, fila, columna)) {

                    for (let x = 0; x < barco.tamano; x++) {


                        if (direccion == "horizontal") {
                            posx = columna + x//incrementa una celda horizontal
                            posY = fila
                        } else if (direccion == "vertical") {
                            posY = fila + x
                            posx = columna
                        }

                        this.#celdasUser[posY][posx].agua = false;//la celda es esa posición estara ocupada

                        this.#celdasUser[posY][posx].posicion.push([posY, posx])//guarda la posicion de esa celda

                        this.#celdasUser[posY][posx].nomBarco = barco.nombre
                        this.#celdasUser[posY][posx].sizeBarco = barco.tamano
                        barco.posiciones.push([posY, posx])
                        
                    }
                    barco.colocado=true
                    colocado = true
                }
            }

        })
    }

    
    get listaBarcos() {

        return this.#listaBarcosUser
    }
    get celdasUser() {
        return this.#celdasUser
    }

}