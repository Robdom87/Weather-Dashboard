var city ="";
var lat = "";
var lon = "";
var prevSearches = [];

//functionalty for search button
$(".search").click(function () {
    city = $(".form-control").val().toUpperCase();

    if (city === "") {
        return;
    }

    if (geoRequest()) {
        //check if the city is already in search history, if so exit function
        if (localStorage.getItem("searchHistory") !== null) {
            var searchHist = JSON.parse(localStorage.getItem("searchHistory"));
            if (searchHist.includes(city)) {
                $(".form-control").val("");
                return;
            }
        }
        //save in local storage, limit of 8
        if (prevSearches.length === 8) {
            prevSearches.pop();
        }
        //add to array then push array to local storages
        prevSearches.unshift(city);
        localStorage.setItem('searchHistory', JSON.stringify(prevSearches));

        //clear out input box
        $(".form-control").val("");

        displaySearches();

    } else {
        //if no city returned, provide dialog and stop function
        $(".modal").show();
        $(".form-control").val("");
        return;
    }
})

//function to close dialog box
$(".close").click(function() {
    $(".modal").hide();
})

//check if search is clicked then add that input to the search box
$("ul").click(function (event) {
    city = $(event.target).text();
    geoRequest();
 })

function displaySearches() {
    //clear out all previous buttons
    $("li").remove();
    //if no cities stored exit formula
    if (localStorage.getItem("searchHistory") === null) {
        return;
    }

    prevSearches = JSON.parse(localStorage.getItem("searchHistory"));

    //add all search buttons
    for (var i = 0; i < prevSearches.length; i++) {
        var histBtn = $("<li>").text(prevSearches[i]);
        $("ul").append(histBtn);
    }
};

//call formula site loads
displaySearches();

function geoRequest() {
    var requestGood = true;
    fetch("http://api.openweathermap.org/geo/1.0/direct?q="+city+"&limit=1&appid=36475aa6e6360c06a75febf0d999bfb7") //once request is accepted ->
        .then(function (geoResp) {
            //add check if city found
            if (geoResp.status !== 200) {
                requestGood = false;
                return null;
            } else {
                return geoResp.json(); //.json because response is http, but ,json extracts json
            }
        })
        .then(function (geoData) {
            if (geoData === null) {
                return;
            } else {
                lat = geoData[0].lat;
                lon = geoData[0].lon;
                weatherRequest();
            }
        })
    return requestGood;
}

function weatherRequest() {
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,alerts&appid=36475aa6e6360c06a75febf0d999bfb7&units=imperial") //once request is accepted ->
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            printCurrent(data);
            print5day(data);
        })
    return;
}

function printCurrent(data) {
    //clear out old box
    $(".currentDay").children().remove();
    
    //add all weather info to section
    let currentBox = $(".currentDay");
    let date = $("<h3>").text(city+" ("+dayjs.unix(data.current.dt).format("MM-DD-YYYY")+")");
    let icon = $("<img>").attr( "src", "http://openweathermap.org/img/wn/"+data.current.weather[0].icon+"@2x.png").css("height", "50px");
    date.append(icon);
    currentBox.append(date);
    let temp = $("<p>").text("Temp: "+data.current.temp+"°F");
    currentBox.append(temp);
    let wind = $("<p>").text("Wind: "+data.current.wind_speed+"MPH");
    currentBox.append(wind);
    let humidity = $("<p>").text("Humidity: "+data.current.humidity+"%");
    currentBox.append(humidity);
    let uv = $("<p>").text("UV Index: ");
    let uvi = data.current.uvi;
    let uvBox = $("<span>").text(uvi);
    //logic to change color of UV box
    if (uvi > 5) {
        uvBox.addClass("badge badge-danger");
    } else {
        uvBox.addClass("badge badge-success");
    }
    uv.append(uvBox);
    currentBox.append(uv);
}

function print5day(data) {
    //clear out old box
    $(".forecastBoxes").children().remove();
    
    //add all weather info to section
    let currentBox = $(".currentDay");
    let date = $("<h3>").text(city+" ("+dayjs.unix(data.current.dt).format("MM-DD-YYYY")+")");
    let icon = $("<img>").attr( "src", "http://openweathermap.org/img/wn/"+data.current.weather[0].icon+"@2x.png").css("height", "50px");
    date.append(icon);
    currentBox.append(date);
    let temp = $("<p>").text("Temp: "+data.current.temp+"°F");
    currentBox.append(temp);
    let wind = $("<p>").text("Wind: "+data.current.wind_speed+"MPH");
    currentBox.append(wind);
    let humidity = $("<p>").text("Humidity: "+data.current.humidity+"%");
    currentBox.append(humidity);
    let uv = $("<p>").text("UV Index: ");
    let uvi = data.current.uvi;
    let uvBox = $("<span>").text(uvi);
    //logic to change color of UV box
    if (uvi > 5) {
        uvBox.addClass("badge badge-danger");
    } else {
        uvBox.addClass("badge badge-success");
    }
    uv.append(uvBox);
    currentBox.append(uv);
}
// use weather API to find all weather data using lat and lon and then populate in

    //color of UV index box change depending on conditions 6 or more is red, 5 or below is green



