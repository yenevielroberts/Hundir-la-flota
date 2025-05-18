export class Barco {
    nombre;
    tamano;
    posiciones = [];
    hundido = false;
    colocado;

    constructor(nombre, tamano) {
        this.hundido = false
        this.nombre = nombre
        this.tamano = tamano
        this.posiciones = []
        this.colocado = false
    }
    //getter
    get nombre() {
        return this.nombre
    }
    get tamano() {
        return this.tamano
    }
    get posiciones() {
        return this.posiciones
    }
    get colocado() {
        return this.colocado
    }

    get hundido() {
        return this.hundido
    }
    //setter
    set nombre(nuevoNombre) {
        this.nombre = nuevoNombre
    }
    set tamano(nuevoSize) {

        this.tamano = nuevoSize;
    }
    set posiciones(nuevaPosicion) {
        this.posiciones = nuevaPosicion
    }
    set colocado(valor) {
        this.colocado = valor
    }

    set hundido(valor) {
        this.hundido = valor
    }

    //Método que carga el json, los valores del json sobreescribiran los valores iniciales de la partida
    cargaDeJson(barcoInfo) {

        this.nombre = barcoInfo.nombre
        this.tamano = barcoInfo.tamano
        this.colocado = barcoInfo.colocado
        this.hundido = barcoInfo.hundido
        this.posiciones = barcoInfo.posiciones

    }

}