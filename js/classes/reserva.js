export class Reserva {
    constructor(dia, hora, durada, userId, passejador) {
        this._dia = dia;
        this._hora = hora;
        this._durada = durada;
        this._userId = userId;
        this._passejador = passejador;
    }
    get dia() {
        return this._dia;
    }
    get hora() {
        return this._hora;
    }
    get durada() {
        return this._durada;
    }
    get passejador() {
        return this._passejador;
    }
}