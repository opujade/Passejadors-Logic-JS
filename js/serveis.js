import { ReservaPasseig } from "./classes/reserva-passeig.js";

/* Constants */
const seccioServeis = document.getElementById('serveis');
const passejadorsUsers = initPassejadorsUsers();
const selectPassejador = document.getElementById('passejador');
const bookBtn = document.getElementById('boto-reserva-passeig');
const dateError = document.getElementById('date-error');
const timeError = document.getElementById('time-error');
const horaReserva = document.getElementById('hora-reserva');
const dataReserva = document.getElementById('data-reserva');

let loggedAccount = JSON.parse(localStorage.getItem('passejadorsUsersStatus'));
let passejadorsBookings = initBookings();

/* Functions */
function loginCheck() {
    if (loggedAccount == null) {
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

function bookWalk() {
    dateError.innerHTML = '';
    timeError.innerHTML = '';
    const date = document.getElementById('data-reserva').value;
    const time = document.getElementById('hora-reserva').value;
    const duration = document.getElementById('durada-reserva').value;
    const walker = document.getElementById('passejador').value;
    const observations = document.getElementById('observacions').value;

    if (date == '') {
        dateError.appendChild(messageError('una data'));
    } else {
        if (time == '') {
            timeError.appendChild(messageError('una hora'));
        } else {
            let bookingAvailable = true;
            passejadorsBookings.forEach(element => {
                if (element._date == date && element._time == time) {

                }
            });
        }
    }
}

function messageError(option) {
    let errorMessage = document.createElement('p');
    errorMessage.style = 'color: red;';
    errorMessage.innerHTML = `Selecciona ${option}.`;
    return errorMessage;
}

/* Check for available walkers and create a Select */
function crearSelectPassejador() {
    let count = 0;
    passejadorsUsers.forEach(element => {
        if (element._admin == true) {
            let passejadorOption = createOptionPassejador(element._name, element._userId);
            selectPassejador.appendChild(passejadorOption);
            count++;
        }
    });
    if (count == 0) {
        let disabledOption = document.createElement('option');
        disabledOption.disabled = true;
        disabledOption.innerHTML = 'No disponibles';
        selectPassejador.appendChild(disabledOption);
    }
}
function createOptionPassejador(optionValue, optionId) {
    let newOption = document.createElement('option');
    newOption.value = optionId;
    newOption.innerHTML = optionValue;
    return newOption;
}

/* Create Hour Options */
function hourSelector() {
    for (let i = 8; i < 23; i++) {
        let disabledOption = false;
        passejadorsBookings.forEach(e => {
            if (e._passejador == selectPassejador.value && e._time == i && e._date == dataReserva.value) {
                disabledOption = true;
            }
        });
        horaReserva.appendChild(createHourOption(`${i}:00`, `${i}:00`, disabledOption));
    }
}
function createHourOption(optionValue, optionId, disableStatus) {
    let newOption = document.createElement('option');
    newOption.value = optionId;
    newOption.disabled = disableStatus;
    newOption.innerHTML = optionValue;
    return newOption;
}

/* Funció inicialitzar */
function initPassejadorsUsers() {
    let passejadorsUsers = JSON.parse(localStorage.getItem('passejadorsUsers'));
    if (passejadorsUsers == null) {
        passejadorsUsers = [];
    }
    return passejadorsUsers;
}

function initBookings() {
    let passejadorsBookings = JSON.parse(localStorage.getItem('passejadorsBookings'));
    if (passejadorsBookings == null) {
        passejadorsBookings = [];
    }
    return passejadorsBookings;
}

/* Calls */
initBookings();
loginCheck();
crearSelectPassejador();
hourSelector();
bookBtn.addEventListener('click', bookWalk);