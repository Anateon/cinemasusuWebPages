if(localStorage.getItem("UserInfo") != null) {
    let userButton = (document.getElementsByClassName("signin-button"))[0];
    let info = JSON.parse(localStorage.getItem("UserInfo"));
    userButton.textContent = info.firstName;
    userButton.textContent += " " + info.lastName;
    userButton.setAttribute('href', "/cinema/userPage.html");
    console.log(element);
}