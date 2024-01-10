export class ReservaMenjar {
    constructor(dogName, date, amount, time, userId, observacions) {
        this._dogName = dogName;
        this._date = date;
        this._amount = amount;
        this._time = time;
        this._userId = userId;
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
    get amount() {
        return this._amount;
    }
    get userId() {
        return this._passejador;
    }
    get observacions() {
        return this._observacions;
    }
}