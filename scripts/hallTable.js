let url = "http://localhost:14050/PlacesByID?ID=" + $_GET("ID");/*;*/

function $_GET(key) {
    let p = window.location.search;
    p = p.match(new RegExp(key + '=([^&=]+)'));
    return p ? p[1] : false;
}

function createTable(_row, _seat){
    let table = document.createElement("table");
    //let container = document.getElementsByClassName("container");
    let form = document.getElementById("post-form");
    for (let i = 1; i <= _row; i++){
        let row = document.createElement("tr");
        let caption = document.createElement("td");
        caption.innerText = "Ряд " + i;
        row.append(caption);
        for (let j = 1; j <= _seat; j++){
            let seat = document.createElement("td");
            let label = document.createElement("label");
            let input = document.createElement("input");
            let span = document.createElement("span");
            label.className = "checkbox-btn"
            label.id = "row-"+i+"-seat-"+j;
            label.style = "visibility: hidden";
            input.type = "checkbox";
            label.append(input);
            label.append(span);
            seat.append(label)
            row.append(seat);
        }
        table.append(row);
    }
    form.prepend(table);
}

function placeAvailable(id, _row, _seat, _realplace){
    let place = document.getElementById("row-"+_row+"-seat-"+_seat);
    let span = place.querySelector("span");
    let input = place.querySelector("input");
    place.style = "";
    input.name = id;
    span.innerText = _realplace;
}
function placeUnavailable(_row, _seat, _realplace){
    let place = document.getElementById("row-"+_row+"-seat-"+_seat);
    place.style = "";
    let span = place.querySelector("span");
    let input = place.querySelector("input");
    span.innerText = _realplace;
    input.disabled = "true";
}

function submitForm(event) {
    event.preventDefault();
    let formData = new FormData(event.target);
    let obj = {};
    formData.forEach((value, key) => obj[key] = value);
    obj["sessionID"] = $_GET("ID");
    console.log(JSON.stringify(obj));

    let xhr = new XMLHttpRequest();
    xhr.open("POST", event.target.action, false);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", "Bearer "+ (JSON.parse(localStorage.getItem("UserInfo")).jwtToken));
    xhr.onreadystatechange = function () {
        let json = JSON.parse(xhr.responseText);
        localStorage.removeItem("PurchasedTickets");
        if (xhr.readyState === 4 && xhr.status === 200) {
            localStorage.setItem("PurchasedTickets", xhr.responseText);
            console.log(json);
        }
        else {
            alert("Ошибка покупки билетов");
            document.location.href = "/cinema/main.html";
        }
    };
    xhr.send(JSON.stringify(obj));
    console.log('Запрос отправляется');
}

function linkToCheck(event) {
    document.location.replace("purchase.html");
}

function priceAndEnabled(event) {
    let q = 0;
    let buttons = document.querySelectorAll('[type="checkbox"]'); //type="checkbox"
    let mainButton = document.getElementById("buyTicket");
    let price = document.getElementById("price");
    buttons.forEach(element =>
    {
        if(element.checked){
            mainButton.removeAttribute("disabled");
            q++;
            //console.log("true");
        }
    })
    if (q == 0){
        mainButton.setAttribute("disabled", true);
    }
    price.innerText = q*filmPrice;
}
let filmPrice;
fetch("http://localhost:14050/FilmPriceByID?ID=" + $_GET("ID"))
    .then(response => response.json())
    .then(responseText => {
        filmPrice = responseText;
        console.log(responseText);
        console.log(filmPrice);
    });

fetch(url)
    .then(response => response.json())
    .then(responseText =>{
        let rowMax = -1;
        let placeMax = -1;
        responseText.forEach(element =>{
            if (element.row > rowMax){
                rowMax = element.row;
            }
            if (element.place1 + element.offset > placeMax){
                placeMax = element.place1 + element.offset;
            }
        })
        createTable(rowMax, placeMax);
        responseText.forEach(element =>{
            if(element.placeIsTaken == 1){
                placeUnavailable(element.row, element.place1+element.offset, element.place1);
            }
            else{
                placeAvailable(element.placeId, element.row, element.place1+element.offset, element.place1);
            }
        })
    });

document.getElementById('post-form').addEventListener('submit', submitForm);
document.getElementById('buyTicket').addEventListener('click',linkToCheck);
document.getElementById('post-form').addEventListener('click',priceAndEnabled);
