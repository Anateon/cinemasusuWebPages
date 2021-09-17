document.getElementById("Firstname").innerText = JSON.parse(localStorage.getItem("UserInfo")).firstName;
document.getElementById("Lastname").innerText = JSON.parse(localStorage.getItem("UserInfo")).lastName;
document.getElementById("Patronymic").innerText = JSON.parse(localStorage.getItem("UserInfo")).patronymic;
document.getElementById("Patronymic").innerText = JSON.parse(localStorage.getItem("UserInfo")).patronymic;
document.getElementById("Date").innerText = JSON.parse(localStorage.getItem("UserInfo")).dateOfBirth.split("T")[0];
document.getElementById("Nick").innerText = JSON.parse(localStorage.getItem("UserInfo")).username;

function accountLogout(q) {
    localStorage.removeItem("UserInfo");
    localStorage.removeItem("PurchasedTickets");
    document.location.href = "/cinema/main.html";
}

let exitButtton = document.getElementById("exitAccount");
exitButtton.addEventListener("click", accountLogout);

function allTickets(q) {
    document.location.href = "/cinema/allPurchase.html";
}

let lookTickets = document.getElementById("viewTickets");
lookTickets.addEventListener("click", allTickets);
