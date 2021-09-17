let url = "http://localhost:14050/";


let tmp = document.getElementsByClassName("film-list");
let filmlist = tmp[0];


fetch(url + "ActualFilms")
    .then(response => response.json())
    .then(responseText =>{
        responseText[0].forEach(element =>{
            let newFilm = document.createElement("li");
            newFilm.id = "film-" + element.filmId;
            let filmName = document.createElement("div");
            filmName.className = "film-name";
            let filmProperty = document.createElement("ul");
            filmProperty.className = "film-properties";
            let propertyTime = document.createElement("li");
            let propertyAge = document.createElement("li");
            propertyTime.innerText = element.duration;
            propertyAge.innerText = element.ageRating + "+";
            filmProperty.prepend(propertyTime);
            filmProperty.prepend(propertyAge);
            filmName.innerText = element.name;
            newFilm.prepend(filmName);
            newFilm.append(filmProperty);
            filmlist.append(newFilm);
        });
        responseText[1].forEach(element =>{
            let filmLi = document.getElementById("film-" + element.filmsId);
            let filmProperty = filmLi.getElementsByClassName("film-properties")[0];
            let property = document.createElement("li");
            property.innerText = element.genreName;
            filmProperty.append(property);
        });
        responseText[2].forEach(element => {
            let timeAndDate = element.timeStart.split("T"); // [0]-date; [1]-time
            let sessionDate = document.getElementById(element.filmId + "-film-and-date-" +timeAndDate[0]);
            if (sessionDate == null) {
                sessionDate = document.createElement("div");
                sessionDate.className = "session-date";
                sessionDate.id = element.filmId + "-film-and-date-" +timeAndDate[0];
                sessionDate.innerText = "Дата сеанса: " + timeAndDate[0];
            }

            let hall = sessionDate.querySelector('[name="hall-'+element.hallId+'"]');
            if (hall == null) {
                hall = document.createElement("div");
                hall.className = "hall-name";
                hall.setAttribute("name", "hall-"+element.hallId)
                let caption = "Зал: " + element.name;
                if (element._3dStatus == true)
                    caption += "[3D]";
                if (element.imaxStatus == true)
                    caption += " [IMAX]"
                hall.innerText = caption;
                let sessionList = document.createElement("ul");
                sessionList.className = "session-times-list";
                hall.append(sessionList);
            }

            let session = document.createElement("li");
            let sessiontime = document.createElement("a");
            sessiontime.href = "hallTable.html?ID=" + element.sessionId;
            session.className = "session-time";
            sessiontime.innerText = timeAndDate[1].slice(0,-3);
            session.append(sessiontime);

            hall.querySelector('[class = "session-times-list"]').append(session);
            sessionDate.append(hall);

            let filmLi = document.getElementById("film-"+element.filmId);
            filmLi.append(sessionDate);
        });
    });