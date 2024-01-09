import { Reserva } from "./classes/reserva.js";

/* Constants */
const seccioServeis = document.getElementById('seccio-serveis');
let passejadorsUsersStatus = JSON.parse(localStorage.getItem('passejadorsUsersStatus'));

/* Functions */
function loginCheck() {
    if (passejadorsUsersStatus == null) {
        seccioServeis.innerHTML = '';
        let loginMessage = document.createElement('p');
        loginMessage.style = 'color: red;';
        loginMessage.innerHTML = 'Inicia sessió per poder reservar un servei: ';
        let loginLink = document.createElement('a');
        loginLink.href = 'login.html';
        loginLink.innerHTML = 'Iniciar Sessió';
        seccioServeis.appendChild(loginMessage);
        seccioServeis.appendChild(loginLink);
    }
}



/* Calls */
loginCheck();