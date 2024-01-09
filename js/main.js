/* Constants */
const loginMenuLink = document.getElementById('login-menu-link');
let passejadorsUsersStatus = JSON.parse(localStorage.getItem('passejadorsUsersStatus'));

/* LoginCheck */
function loginCheck() {
    if (passejadorsUsersStatus != null) {
        loginMenuLink.href = 'user-page.html';
        loginMenuLink.innerHTML = `Hola, ${passejadorsUsersStatus._name}`;
    }
}

loginCheck();