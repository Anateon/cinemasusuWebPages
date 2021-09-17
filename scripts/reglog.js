function loginEvent(event) {
    event.preventDefault();
    let formData = new FormData(event.target);
    let obj = {};
    formData.forEach((value, key) => obj[key] = value);

    let xhr = new XMLHttpRequest();
    xhr.open("POST", event.target.action, false);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let json = JSON.parse(xhr.responseText);
            localStorage.setItem("UserInfo", xhr.responseText);
            console.log(json);
            window.history.back();
        }
        else {
            alert("Ошибка: " + JSON.parse(xhr.responseText).message)
        }
    };
    xhr.send(JSON.stringify(obj));
    console.log('Запрос отправляется');
}
function registerEvent(event) {
    event.preventDefault();
    let formData = new FormData(event.target);
    let obj = {};
    formData.forEach((value, key) => obj[key] = value);
    let xhr = new XMLHttpRequest();
    xhr.open("POST", event.target.action, false);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            alert("Вы успешно зарегестрировались");
            location.href=location.href;
        }
        else {
            alert("Ошибка: " + JSON.parse(xhr.responseText).message)
        }
    };
    xhr.send(JSON.stringify(obj));
    console.log('Запрос отправляется');
}
document.getElementById('login-form').addEventListener('submit', loginEvent);
document.getElementById('signup-form').addEventListener('submit', registerEvent);

//anim
const switchers = [...document.querySelectorAll('.switcher')]
switchers.forEach(item => {
    item.addEventListener('click', function() {
        switchers.forEach(item => item.parentElement.classList.remove('is-active'))
        this.parentElement.classList.add('is-active')
    })
})

