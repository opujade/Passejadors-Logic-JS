/* Constants */
const passejadorsUsers = initPassejadorsUsers();
console.log(passejadorsUsers);
const loginBtn = document.getElementById('login-button');
const loginMessage = document.getElementById('login-message');
const loginMenuLink = document.getElementById('login-menu-link');
const seccioIniciarSessio = document.getElementById('seccio-iniciar-sessio');
const seccioCompteUsuari = document.getElementById('seccio-compte-usuari');
let passejadorsUsersStatus = JSON.parse(localStorage.getItem('passejadorsUsersStatus'));

/* LoginCheck */
function loginCheck() {
    if (passejadorsUsersStatus != null) {
        loginMenuLink.href = 'user-page.html';
        loginMenuLink.innerHTML = `Hola, ${passejadorsUsersStatus._name}`;
        console.log(loginMenuLink)
        seccioIniciarSessio.innerHTML = `<p>Sessió iniciada com a ${passejadorsUsersStatus._username}`;
        seccioCompteUsuari.innerHTML = '';
        let userLabel = document.createElement('label');
        userLabel.for = 'user-page';
        userLabel.innerHTML = 'Consulta les teves reserves: ';
        let userLink = document.createElement('a');
        userLink.href = 'user-page.html';
        userLink.innerHTML = 'El meu compte';
        seccioCompteUsuari.appendChild(userLabel);
        seccioCompteUsuari.appendChild(userLink);
    }
}
/* Login Logics */
function loginFunction() {
    loginMessage.innerHTML = '';
    let username = document.getElementById('login-username').value;
    let password = document.getElementById('login-password').value;
    let userLogged = loginValidation(username, password);

    if (userLogged == false) {
        loginMessage.innerHTML = '<p style="color: red">Usuari o contrassenya equivocats.</p>';
    } else {
        localStorage.setItem('passejadorsUsersStatus', JSON.stringify(userLogged));
        loginMessage.innerHTML = '<p style="color: green">Sessió iniciada.</p>';
        location.reload();
    }
}

function loginValidation(username, password) {
    const userIndex = passejadorsUsers.findIndex((e) => e._username == username);
    if (userIndex != -1) {
        if (passejadorsUsers[userIndex]._password == password) {
            return passejadorsUsers[userIndex];
        } else {
            return false;
        }
    } else {
        return false;
    }
}

/* Funció inicialitzar */
function initPassejadorsUsers() {
    let passejadorsUsers = JSON.parse(localStorage.getItem('passejadorsUsers'));
    if (passejadorsUsers == null) {
        passejadorsUsers = [];
    }
    return passejadorsUsers;
}

loginBtn.addEventListener('click', loginFunction);
loginCheck();