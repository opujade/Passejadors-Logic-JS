export class User {
    constructor(username, password, mail, admin, userId) {
        this._username = username;
        this._password = password;
        this._mail = mail;
        this._admin = admin;
        this._userId = userId;
    }

    get username() { 
        return this._username;
    }
    get mail() { 
        return this._mail;
    }
    get userId() { 
        return this._userId;
    }
    get admin() { 
        return this._admin;
    }
    set username(newUsername) {
        this._username = newUsername;
    }
    set password(newPassword) {
        this._password = newPassword;
    }
}