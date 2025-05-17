export class Celda {
    agua
    tocado
    posicion = [];
    nomBarco
    sizeBarco

    constructor() {
        this.agua = true
        this.tocado = false
        this.posicion = []
        this.nomBarco = ""
        this.sizeBarco = 0
    }

    get agua() {

        return this.agua
    }
    set agua(valor) {
        this.agua = valor

    }
    get tocado() {

        return this.tocado
    }

    get posicion() {
        return this.posicion
    }

    get nomBarco() {
        return this.nomBarco
    }

    get sizeBarco() {
        return this.sizeBarco
    }
    set sizeBarco(valor) {
        this.sizeBarco = valor
    }

    set nomBarco(valor) {
        this.nomBarco = valor
    }
    set posicion(valor) {

        this.posicion = valor
    }

    set tocado(valor) {

        this.tocado = valor
    }

    cargaDeJson(celdaInfo){
        this.agua = celdaInfo.agua
        this.tocado = celdaInfo.tocado
        this.posicion = celdaInfo.posicion
        this.nomBarco = celdaInfo.nomBarco
        this.sizeBarco = celdaInfo.sizeBarco
    }
}