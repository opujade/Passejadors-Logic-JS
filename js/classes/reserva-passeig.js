export class ReservaPasseig {
    constructor(dogName, date, time, durada, userId, passejador, observacions) {
        this._dogName = dogName;
        this._date = date;
        this._time = time;
        this._durada = durada;
        this._userId = userId;
        this._passejador = passejador;
        this._observacions = observacions;
    }
    get dogName() {
        return this._dogName;
    }
    get date() {
        return this._date;
    }
    get time() {
        return this._time;
    }
    get durada() {
        return this._durada;
    }
    get passejador() {
        return this._passejador;
    }
    get observacions() {
        return this._observacions;
    }
}