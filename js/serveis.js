import { ReservaPasseig } from "./classes/reserva-passeig.js";
import { ReservaMenjar } from "./classes/reserva-menjar.js";

/* Constants */
/* Seccions generals */
const seccioServeis = document.getElementById('serveis');
const seccioReserva = document.getElementsByClassName('seccio-reserva');
/* Servei Passejar */
const serveisPassejar = document.getElementById('serveis-passejar');
const serveisPassejarBtn = document.getElementById('serveis-passejar__button');
const selectPassejador = document.getElementById('passejador');
const dataReserva = document.getElementById('data-reserva');
const dateError = document.getElementById('date-error');
const showTimeButton = document.getElementById('show-time-button');
const horaReserva = document.getElementById('hora-reserva');
const bookBtn = document.getElementById('boto-reserva-passeig');
/* Servei Menjar */
const serveisMenjar = document.getElementById('serveis-menjar');
const serveisMenjarBtn = document.getElementById('serveis-menjar__button');
const dataReservaMenjar = document.getElementById('data-reserva-menjar');
const vegadesDiaBtn = document.getElementById('vegades-dia-button');
const vegadesMenjar = document.getElementById('vegades-menjar');
const seccioHoraReservaMenjar = seccioReserva[9];
const bookFoodBtn = document.getElementById('boto-reserva-menjar');

/* Data Base Objects */
const passejadorsUsers = initPassejadorsUsers();
const loggedAccount = JSON.parse(localStorage.getItem('passejadorsUsersStatus'));
const passejadorsWalkBookings = initWalkBookings();
const passejadorsFoodBookings = initFoodBookings();
console.log(passejadorsWalkBookings)
console.log(passejadorsFoodBookings)
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

/* --------------- SECCIÓ PASSEJAR --------------- */
function bookWalk() {
    if (comprovarData(dataReserva.value)) {
        dateError.innerHTML = '';
        const dogName = document.getElementById('dog-name').value;
        const date = document.getElementById('data-reserva').value;
        const time = document.getElementById('hora-reserva').value;
        const duration = document.getElementById('durada-reserva').value;
        const walker = parseInt(document.getElementById('passejador').value);
        const observations = document.getElementById('observacions').value;

        passejadorsWalkBookings.push(new ReservaPasseig(dogName, date, time, duration, loggedAccount._userId, walker, observations));
        localStorage.setItem('passejadorsWalkBookings', JSON.stringify(passejadorsWalkBookings));
        serveisPassejar.innerHTML = '<p style=color:green>Reserva feta.<p>';
    } else {
        errorDataPasseig();
        dateError.innerHTML = '<p style=color:red;>Reserva amb 24h d\'antelació.</p>';
    }
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
    if (document.getElementById('dog-name').value != '') {
        document.getElementById('name-error').innerHTML = '';
        if (comprovarData(dataReserva.value)) {
            dateError.innerHTML = '';
            seccioReserva[3].classList.remove('hidden');
            for (let i = 8; i <= 22; i += 2) {
                let disabledOption = false;
                passejadorsWalkBookings.forEach(e => {
                    if (e._passejador == selectPassejador.value && e._date == dataReserva.value && e._time == `${i}:00`) {
                        disabledOption = true;
                    }
                });
                horaReserva.appendChild(createHourOption(`${i}:00`, `${i}:00`, disabledOption));
            }
            console.log(document.getElementById('show-duration-button'));
            if (document.getElementById('show-duration-button') != null) {
                document.getElementById('show-duration-button').remove();
            }
            let durationButton = createButton('Durada', 'show-duration-button', durationSelector);
            seccioReserva[3].insertBefore(durationButton, seccioReserva[3].childNodes[4]);
        } else {
            errorDataPasseig();
            dateError.innerHTML = '<p style=color:red;>Reserva amb 24h d\'antelació.</p>';
        }
    } else {
        document.getElementById('name-error').innerHTML = '<p style=color:red;>Escriu un nom.</p>';
    }
}
function comprovarData(data) {
    const dayInput = data.slice(8, 10);
    const monthInput = parseInt(data.slice(6, 8));
    const yearInput = parseInt(data.slice(0, 4));
    const actualDay = parseInt(new Date().toJSON().slice(8, 10));
    const actualMonth = parseInt(new Date().toJSON().slice(6, 8));
    const actualYear = parseInt(new Date().toJSON().slice(0, 4));
    if (data != '' && yearInput >= actualYear) {
        if (monthInput >= actualMonth) {
            if (monthInput == actualMonth && dayInput > actualDay) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    } else {
        return false;
    }
}
function createHourOption(optionValue, optionId, disableStatus) {
    let newOption = document.createElement('option');
    newOption.value = optionId;
    newOption.disabled = disableStatus;
    newOption.innerHTML = optionValue;
    return newOption;
}
/* Show functions*/
function durationSelector() {
    seccioReserva[4].classList.remove('hidden');
    if (document.getElementById('show-observations-button') != null) {
        document.getElementById('show-observations-button').remove();
    } let observationsButton = createButton('Observacions', 'show-observations-button', observationsSelector);
    seccioReserva[4].appendChild(observationsButton);
}
function observationsSelector() {
    seccioReserva[5].classList.remove('hidden');
    bookBtn.classList.remove('hidden');
}
function showDatePassejador() {
    document.getElementsByClassName('serveis-opcions')[0].classList.remove('hidden');
    let newHeader = document.createElement('h2');
    newHeader.innerHTML = 'Passejar';
    serveisPassejar.insertBefore(newHeader, serveisPassejar.childNodes[0]);
    serveisPassejarBtn.classList = 'hidden';
    serveisMenjarBtn.classList = 'hidden';
}

/* --------------- SECCIÓ MENJAR --------------- */
function showMenjarSection() {
    let newHeader = document.createElement('h2');
    newHeader.innerHTML = 'Menjar';
    serveisMenjar.insertBefore(newHeader, serveisMenjar.childNodes[0]);
    document.getElementsByClassName('serveis-opcions')[1].classList.remove('hidden');
    serveisPassejarBtn.classList = 'hidden';
    serveisMenjarBtn.classList = 'hidden';
}
function showVegadesDiaSection() {
    document.getElementById('food-date-error').innerHTML = '';
    if (document.getElementById('nom-gos-menjar').value != '') {
        document.getElementById('food-dog-name-error').innerHTML = '';
        if (comprovarData(dataReservaMenjar.value)) {
            seccioReserva[8].classList.remove('hidden');
            let hourButton = createButton('Hora', 'food-hour-button', foodHourSelector);
            seccioReserva[8].appendChild(hourButton);

        } else {
            errorDataPasseig();
            document.getElementById('food-date-error').innerHTML = '<p style=color:red;>Reserva amb 24h d\'antelació.</p>';
        }
    } else {
        document.getElementById('food-dog-name-error').innerHTML = '<p style=color:red;>Escriu un nom.</p>';
    }
}
function foodHourSelector() {
    document.getElementById('food-date-error').innerHTML = '';
    seccioReserva[9].classList.remove('hidden');
    for (let j = 0; j < parseInt(vegadesMenjar.value); j++) {
        for (let k = 0; k < 3; k++) {
            if (document.getElementById(`hora-menjar-${j + k}`) != null) {
                document.getElementById(`hora-menjar-${j + k}`).remove(); // Eliminar els selectors sobrants si es torna a clicar el botó "Hora" i n'hi ha més del compte
            }
        }
        let newSelector = createSelector(`hora-menjar-${j}`, `hora-menjar-${j}`);
        seccioHoraReservaMenjar.appendChild(newSelector);
        for (let i = 8; i <= 22; i += 2) {
            let disabledOption = false;
            passejadorsWalkBookings.forEach(e => {
                if (e._date == dataReservaMenjar.value && e._time == `${i}:00`) {
                    disabledOption = true;
                }
            });
            document.getElementById(`hora-menjar-${j}`).appendChild(createHourOption(`${i}:00`, `${i}:00`, disabledOption));
        }

    }
    if (document.getElementById('food-observations-button') != null) {
        document.getElementById('food-observations-button').remove();
    }
    let observationsButton = createButton('Observacions', 'food-observations-button', foodObservationsSelector);
    seccioReserva[9].appendChild(observationsButton);
}
function createSelector(selectorName, selectorId) {
    let newSelector = document.createElement('select')
    newSelector.name = selectorName;
    newSelector.id = selectorId;
    return newSelector;
}
function foodObservationsSelector() {
    seccioReserva[10].classList.remove('hidden');
    bookFoodBtn.classList.remove('hidden');
}
function bookFood() {
    if (comprovarData(dataReservaMenjar.value)) {
        document.getElementById('food-date-error').innerHTML = '';
        const dogName = document.getElementById('nom-gos-menjar').value;
        const date = document.getElementById('data-reserva-menjar').value;
        const vegades = document.getElementById('vegades-menjar').value;
        const time = [];
        for (let i = 0; i < 3; i++) {
            if (document.getElementById(`hora-menjar-${i}`) != null) {
                time[i] = document.getElementById(`hora-menjar-${i}`).value;
            }
        }
        const observations = document.getElementById('observacions-menjar').value;

        passejadorsFoodBookings.push(new ReservaMenjar(dogName, date, vegades, time, loggedAccount._userId, observations));
        localStorage.setItem('passejadorsFoodBookings', JSON.stringify(passejadorsFoodBookings));
        serveisMenjar.innerHTML = '<p style=color:green>Reserva feta.<p>';
    } else {
        errorDataMenjar();
        document.getElementById('food-date-error').innerHTML = '<p style=color:red;>Reserva amb 24h d\'antelació.</p>';
    }
}


/* --------------- ALTRES FUNCIONS --------------- */
/* Funció Create Button */
function createButton(buttonValue, buttonId, buttonFunc) {
    let newBtn = document.createElement('input');
    newBtn.type = 'button';
    newBtn.value = buttonValue;
    newBtn.id = buttonId;
    newBtn.addEventListener('click', buttonFunc);
    return newBtn;
}
/* Error en introduïr la data */
function errorDataPasseig() {
    seccioReserva[3].classList += ' hidden';
    seccioReserva[4].classList += ' hidden';
    seccioReserva[5].classList += ' hidden';
    bookBtn.classList = 'hidden';
}
function errorDataMenjar() {
    seccioReserva[8].classList += ' hidden';
    seccioReserva[9].classList += ' hidden';
    seccioReserva[10].classList += ' hidden';
    bookFoodBtn.classList = 'hidden';
}

/* Funció inicialitzar */
function initPassejadorsUsers() {
    let passejadorsUsers = JSON.parse(localStorage.getItem('passejadorsUsers'));
    if (passejadorsUsers == null) {
        passejadorsUsers = [];
    }
    return passejadorsUsers;
}

function initWalkBookings() {
    let passejadorsWalkBookings = JSON.parse(localStorage.getItem('passejadorsWalkBookings'));
    if (passejadorsWalkBookings == null) {
        passejadorsWalkBookings = [];
    }
    return passejadorsWalkBookings;
}
function initFoodBookings() {
    let passejadorsFoodBookings = JSON.parse(localStorage.getItem('passejadorsFoodBookings'));
    if (passejadorsFoodBookings == null) {
        passejadorsFoodBookings = [];
    }
    return passejadorsFoodBookings;
}

/* Calls */
initWalkBookings();
initFoodBookings();
loginCheck();
crearSelectPassejador();
bookBtn.addEventListener('click', bookWalk);
bookFoodBtn.addEventListener('click', bookFood);
showTimeButton.addEventListener('click', hourSelector);
serveisPassejarBtn.addEventListener('click', showDatePassejador);
serveisMenjarBtn.addEventListener('click', showMenjarSection);
vegadesDiaBtn.addEventListener('click', showVegadesDiaSection);