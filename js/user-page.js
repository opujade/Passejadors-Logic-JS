/* Constants */
const loginMenuLink = document.getElementById('login-menu-link');
const logoutBtn = document.getElementById('logout-button');
let passejadorsUsersStatus = JSON.parse(localStorage.getItem('passejadorsUsersStatus'));

/* LoginCheck */
function loginCheck() {
    if (passejadorsUsersStatus != null) {
        loginMenuLink.href = 'user-page.html';
        loginMenuLink.innerHTML = `Hola, ${passejadorsUsersStatus._name}`;
        console.log(passejadorsUsersStatus);
    } else {
        location.replace('login.html');
    }
}

function logoutPassejadors() {
    passejadorsUsersStatus = null;
    localStorage.setItem('passejadorsUsersStatus', JSON.stringify(passejadorsUsersStatus));
    location.replace('login.html');
}

loginCheck();
logoutBtn.addEventListener('click', logoutPassejadors);