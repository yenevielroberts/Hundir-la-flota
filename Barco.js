export class Barco {
    #nombre;
    #tamano;
    #posiciones = [];
    #casillasTocadas = 0;
    #colocado;

    constructor(nombre, tamano, casillasTocadas) {
        this.#casillasTocadas = casillasTocadas
        this.#nombre = nombre
        this.#tamano = tamano
        this.#posiciones = []
        this.#colocado=false
    }
    //getter
    get nombre() {
        return this.#nombre
    }
    get tamano() {
        return this.#tamano
    }
    get posiciones() {
        return this.#posiciones
    }
    get colocado(){
        return this.#colocado
    }
    //setter
    set nombre(nuevoNombre) {
        this.#nombre = nuevoNombre
    }
    set tamano(nuevoSize) {

        this.#tamano = nuevoSize;
    }
    set posiciones(nuevaPosicion) {
        this.#posiciones = nuevaPosicion
    }
    set colocado(valor){
        this.#colocado=valor
    }

}