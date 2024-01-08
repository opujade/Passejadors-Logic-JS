import { User } from "./user.js";

/* Globals */
const passejadorsUsers = initPassejadorsUsers();
let passejadorsUsersStatus = localStorage.getItem('passejadorsUsersStatus');

/* Signup Section */
const signupBtn = document.getElementById('signup-button');
const signupUsernameError = document.getElementById('signup-username-error');
const signupPasswordError = document.getElementById('signup-password-error');
const signupRepeatPasswordError = document.getElementById('signup-repeat-password-error');
const signupMailError = document.getElementById('signup-mail-error');
const signupComplete = document.getElementById('signup-complete');


/* ------------- SIGN UP ------------- */
function createUser() {
    // Buidar errors:
    signupUsernameError.innerHTML = '';
    signupPasswordError.innerHTML = '';
    signupRepeatPasswordError.innerHTML = '';
    signupMailError.innerHTML = '';
    // Recollir dades:
    let username = document.getElementById('signup-username').value;
    let password = document.getElementById('signup-password').value;
    let repeatPassword = document.getElementById('repeat-password').value;
    let mail = document.getElementById('signup-mail').value;

    // Validar nom d'usuari:
    const validateUser = validateSignupUserPassword(username);
    if (validateUser != 0) {
        switch (validateUser) {
            case 1: signupUsernameError.innerHTML = '<p style="color: red">No es poden introduïr els següents caràcters: &, =, _, -, \', ", +, ,, <, >. </p>';
            case 2: signupUsernameError.innerHTML = '<p style="color: red">No hi pot haver dos punts seguits.</p>';
            case 3: signupUsernameError.innerHTML = '<p style="color: red">El nom d\'usuari ha de ser entre 6 i 30 caràcters.</p>';
        }
    } else {
        // Validar contrassenya:
        const validatePassword = validateSignupUserPassword(password);
        if (validatePassword != 0) {
            switch (validatePassword) {
                case 1: signupPasswordError.innerHTML = '<p style="color: red">No es poden introduïr els següents caràcters: &, =, _, -, \', ", +, ,, <, >. </p>';
                case 2: signupPasswordError.innerHTML = '<p style="color: red">No hi pot haver dos punts seguits.</p>';
                case 3: signupPasswordError.innerHTML = '<p style="color: red">La contrassenya ha de ser entre 6 i 30 caràcters.</p>';
            }
        } else {
            // Validar repetir contrassenya:
            if (repeatPassword != password) {
                signupRepeatPasswordError.innerHTML = '<p style="color: red">Les contrassenyes no coincideixen.</p>';
            } else {
                // Validar correu electrònic:
                if (validateEmail(mail)) {
                    // Comprovar que el nom d'usuari no existeix:
                    if (comprovarUsername(username)) {
                        if (comprovarMail(mail)) {
                            passejadorsUsers.push(new User(username, password, mail, false, passejadorsUsers.length++));
                            localStorage.setItem('passejadorsUsers', JSON.stringify(passejadorsUsers));
                            signupComplete.innerHTML = '<p style="color: green">Compte creat correctament.</p>';
                        } else {
                            signupMailError.innerHTML = '<p style="color: red">Aquest correu ja està registrat.</p>';
                        }
                    } else {
                        signupUsernameError.innerHTML = '<p style="color: red">Aquest usuari ja existeix.</p>';
                    }
                } else {
                    signupMailError.innerHTML = '<p style="color: red">El format del correu no és correcte.</p>';
                }
            }
        }
    }

}

/* Function Validate */
function comprovarUsername(username) {
    passejadorsUsers.forEach(element => {
        if (element.username == username) {
            return false;
        }
    });
    return true;
}
function comprovarMail(mail) {
    passejadorsUsers.forEach(element => {
        if (element.mail == mail) {
            return false;
        }
    });
    return true;
}

function validateSignupUserPassword(usernamePassword) {
    const errorChars = ['&', '=', '_', '\'', '"', '-', '+', ',', '<', '>'];
    if (usernamePassword.length >= 6 && usernamePassword.length <= 30) {
        for (let i = 0; i < usernamePassword.length; i++) {
            errorChars.forEach(element => {
                if (element == usernamePassword.charAt(i)) {
                    return 1; // 1 = Error de caràcters. No es poden introduïr &, =, _, -, ', ", +, ,, <, >.
                }
            });
            if (usernamePassword.charAt(i) == '.' && usernamePassword.charAt(i + 1) == '.') {
                return 2; // 2 = Error: no hi pot haver dos punts seguits.
            }
        }
        return 0; // Cap error;
    } else {
        return 3; // 3 = Error: el nom d'usuari ha de ser de 6 a 30 caràcters.
    }
}

function validateEmail(mail) {
    let count = 0;
    for (let i = 0; i < mail.length; i++) {
        if (mail.charAt(i) == '@') {
            count++;
        }
    }
    if (count != 1) {
        return false;
    } else {
        return true;
    }
}

function initPassejadorsUsers() {
    let passejadorsUsers = JSON.parse(localStorage.getItem('passejadorsUsers'));
    if (passejadorsUsers == null) {
        passejadorsUsers = [];
    }
    return passejadorsUsers;
}

/* Event Listeners */
signupBtn.addEventListener('click', createUser);