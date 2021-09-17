let url = "http://localhost:14050/";
let tmp = document.getElementsByTagName("ul");
let ticketList = tmp[0];

// GetUserTickets
//    xhr.setRequestHeader("Authorization", "Bearer "+ (JSON.parse(localStorage.getItem("UserInfo")).jwtToken));
fetch(url + "GetUserTickets",
    {
        headers: {
            Authorization: "Bearer " + JSON.parse(localStorage.getItem("UserInfo")).jwtToken
        }
    })
    .then(response => response.json())
    .then(responseText => {
        responseText.forEach (
            element =>{
                //price
                let Price = document.createElement("tr");
                let PriceProperty = document.createElement("td");
                let PriceValue = document.createElement("td");
                let PricePropertyBold = document.createElement("b");
                PricePropertyBold.innerText = "Цена:";
                PriceValue.innerText = element.Price.toFixed(2)+ " ₽";
                PriceProperty.append(PricePropertyBold);
                Price.append(PriceProperty);
                Price.append(PriceValue);
                //film-name
                let FilmName = document.createElement("tr");
                let FilmNameProperty = document.createElement("td");
                let FilmNameValue = document.createElement("td");
                let FilmNamePropertyBold = document.createElement("b");
                FilmNamePropertyBold.innerText = "Фильм:";
                FilmNameValue.innerText = element.FilmName;
                FilmNameProperty.append(FilmNamePropertyBold);
                FilmName.append(FilmNameProperty);
                FilmName.append(FilmNameValue);
                //seasson-time
                let SeassonTime = document.createElement("tr");
                let SeassonTimeProperty = document.createElement("td");
                let SeassonTimeValue = document.createElement("td");
                let SeassonTimePropertyBold = document.createElement("b");
                SeassonTimePropertyBold.innerText = "Время:";
                SeassonTimeValue.innerText = ((element.StartTime).split("T"))[1].slice(0,-3); // [0]-date; [1]-time;
                SeassonTimeProperty.append(SeassonTimePropertyBold);
                SeassonTime.append(SeassonTimeProperty);
                SeassonTime.append(SeassonTimeValue);
                //season-date
                let SeassonDate = document.createElement("tr");
                let SeassonDateProperty = document.createElement("td");
                let SeassonDateValue = document.createElement("td");
                let SeassonDatePropertyBold = document.createElement("b");
                SeassonDatePropertyBold.innerText = "Дата:";
                SeassonDateValue.innerText = ((element.StartTime).split("T"))[0]; // [0]-date; [1]-time;
                SeassonDateProperty.append(SeassonDatePropertyBold);
                SeassonDate.append(SeassonDateProperty);
                SeassonDate.append(SeassonDateValue);
                //hall-hame
                let HallName = document.createElement("tr");
                let HallNameProperty = document.createElement("td");
                let HallNameValue = document.createElement("td");
                let HallNamePropertyBold = document.createElement("b");
                HallNamePropertyBold.innerText = "Зал:";
                HallNameValue.innerText = element.Hall;
                HallNameProperty.append(HallNamePropertyBold);
                HallName.append(HallNameProperty);
                HallName.append(HallNameValue);
                //Row
                let Row = document.createElement("tr");
                let RowProperty = document.createElement("td");
                let RowValue = document.createElement("td");
                let RowPropertyBold = document.createElement("b");
                RowPropertyBold.innerText = "Ряд:";
                RowValue.innerText = element.Row;
                RowProperty.append(RowPropertyBold);
                Row.append(RowProperty);
                Row.append(RowValue);
                //Place
                let Place = document.createElement("tr");
                let PlaceProperty = document.createElement("td");
                let PlaceValue = document.createElement("td");
                let PlacePropertyBold = document.createElement("b");
                PlacePropertyBold.innerText = "Место:";
                PlaceValue.innerText = element.Place;
                PlaceProperty.append(PlacePropertyBold);
                Place.append(PlaceProperty);
                Place.append(PlaceValue);
                //idSeason
                let header = document.createElement("h3");
                header.innerText = "Билет №" + element.ID;


                // let elementList = document.createElement("li");
                // elementList.prepend((((document.createElement("h3")).innerText) = "Билет #" + element.ID));
                // let tableProperty = ((document.createElement("table")).style = "text-align: left");
                // let hallName = document.createElement("tr");
                // hallName.append(document.createElement("td").append(document.createElement("b").innerText=element.Hall));
                // //tableProperty.prepend(hallName);
                // elementList.prepend(tableProperty);



                let tableInfo = document.createElement("table");
                tableInfo.style = "text-align: left";
                tableInfo.append(FilmName);
                tableInfo.append(SeassonDate);
                tableInfo.append(SeassonTime);
                tableInfo.append(Row);
                tableInfo.append(Place);
                tableInfo.append(HallName);
                tableInfo.append(Price);

                let QRtext = element.ID;
                console.log(String(QRtext));
                let allInfo = document.createElement("li");
                allInfo.className = "ticket"
                allInfo.append(tableInfo);
                allInfo.prepend(header);
                allInfo.append(QRCode.generateHTML(String(QRtext), {}));
                ticketList.prepend(allInfo);
            })});
