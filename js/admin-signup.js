import { User } from "./classes/user.js";

/* Globals */
const passejadorsUsers = initPassejadorsUsers();
let passejadorsUsersStatus = localStorage.getItem('passejadorsUsersStatus');
console.log(passejadorsUsers);

/* Signup Admin Section */
const signupAdminBtn = document.getElementById('admin-signup-button');
const signupAdminUsernameError = document.getElementById('admin-signup-username-error');
const signupAdminPasswordError = document.getElementById('admin-signup-password-error');
const signupAdminRepeatPasswordError = document.getElementById('admin-repeat-password-error');
const signupAdminMailError = document.getElementById('admin-signup-mail-error');
const signupAdminComplete = document.getElementById('signup-admin-complete');
const eliminarComptesAdminBtn = document.getElementById('eliminar-comptes-admin-btn');

/* ------------- SIGN UP ADMIN ------------- */
function createAdminUser() {
    // Buidar errors:
    signupAdminUsernameError.innerHTML = '';
    signupAdminPasswordError.innerHTML = '';
    signupAdminRepeatPasswordError.innerHTML = '';
    signupAdminMailError.innerHTML = '';
    // Recollir dades:
    let name = document.getElementById('admin-signup-name').value;
    let lastName = document.getElementById('admin-signup-lastname').value;
    let username = document.getElementById('admin-signup-username').value;
    let password = document.getElementById('admin-signup-password').value;
    let repeatPassword = document.getElementById('admin-repeat-password').value;
    let mail = document.getElementById('admin-signup-mail').value;

    // Validar nom d'usuari:
    const validateUser = validateSignupUserPassword(username);
    if (validateUser != 0) {
        switch (validateUser) {
            case 1: signupAdminUsernameError.innerHTML = '<p style="color: red">No es poden introduïr els següents caràcters: &, =, _, -, \', ", +, ,, <, >. </p>';
            case 2: signupAdminUsernameError.innerHTML = '<p style="color: red">No hi pot haver dos punts seguits.</p>';
            case 3: signupAdminUsernameError.innerHTML = '<p style="color: red">El nom d\'usuari ha de ser entre 6 i 30 caràcters.</p>';
        }
    } else {
        // Validar contrassenya:
        const validatePassword = validateSignupUserPassword(password);
        if (validatePassword != 0) {
            switch (validatePassword) {
                case 1: signupAdminPasswordError.innerHTML = '<p style="color: red">No es poden introduïr els següents caràcters: &, =, _, -, \', ", +, ,, <, >. </p>';
                case 2: signupAdminPasswordError.innerHTML = '<p style="color: red">No hi pot haver dos punts seguits.</p>';
                case 3: signupAdminPasswordError.innerHTML = '<p style="color: red">La contrassenya ha de ser entre 6 i 30 caràcters.</p>';
            }
        } else {
            // Validar repetir contrassenya:
            if (repeatPassword != password) {
                signupAdminRepeatPasswordError.innerHTML = '<p style="color: red">Les contrassenyes no coincideixen.</p>';
            } else {
                // Validar correu electrònic:
                if (validateEmail(mail)) {
                    // Comprovar que el nom d'usuari no existeix:
                    if (comprovarUsername(username)) {
                        if (comprovarMail(mail)) {
                            const newUserId = passejadorsUsers.length + 1;
                            passejadorsUsers.push(new User(name, lastName, username, password, mail, true, newUserId));
                            localStorage.setItem('passejadorsUsers', JSON.stringify(passejadorsUsers));
                            signupAdminComplete.innerHTML = '<p style="color: green">Compte creat correctament.</p>';
                            passejadorsUsersStatus = passejadorsUsers[passejadorsUsers.length - 1];
                            localStorage.setItem('passejadorsUsersStatus', JSON.stringify(passejadorsUsersStatus));
                            location.replace('user-page.html');
                        } else {
                            signupAdminMailError.innerHTML = '<p style="color: red">Aquest correu ja està registrat.</p>';
                        }
                    } else {
                        signupAdminUsernameError.innerHTML = '<p style="color: red">Aquest usuari ja existeix.</p>';
                    }
                } else {
                    signupAdminMailError.innerHTML = '<p style="color: red">El format del correu no és correcte.</p>';
                }
            }
        }
    }

}

/* Function Validate */
function comprovarUsername(username) {
    let validUser = true;
    passejadorsUsers.forEach(element => {
        if (element._username == username) {
            validUser = false;
        }
    });
    return validUser;
}
function comprovarMail(mail) {
    let validMail = true;
    passejadorsUsers.forEach(element => {
        if (element._mail == mail) {
            validMail = false;
        }
    });
    return validMail;
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

/* Funcions inicialitzar i eliminar */
function initPassejadorsUsers() {
    let passejadorsUsers = JSON.parse(localStorage.getItem('passejadorsUsers'));
    if (passejadorsUsers == null) {
        passejadorsUsers = [];
        localStorage.setItem('passejadorsUsers', JSON.stringify(passejadorsUsers));
    }
    return passejadorsUsers;
}
function eliminarComptes() {
    const compteNum = parseInt(document.getElementById('compte-num').value);
    passejadorsUsers.splice(compteNum, 1);
    localStorage.setItem('passejadorsUsers', JSON.stringify(passejadorsUsers));
}
function comprovarContrassenyaAdmin() {
    let password = prompt('Escriu la contrassenya d\'administrador:');
    if (password != '123') {
        document.getElementById('seccio-crear-compte-admin').innerHTML = '<p style="color:red">No pots crear un compte d\'administrador.';
    }
}

/* Event Listeners & Functions */
signupAdminBtn.addEventListener('click', createAdminUser);
eliminarComptesAdminBtn.addEventListener('click', eliminarComptes);
comprovarContrassenyaAdmin();