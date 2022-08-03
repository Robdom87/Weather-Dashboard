var city = "";
var lat = "";
var lon = "";
var apiKey = "36475aa6e6360c06a75febf0d999bfb7";
var geoUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=" + apiKey;
var requestUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,alerts&appid=" + apiKey + "&units=imperial";
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
    // fetch(geoUrl) //once request is accepted ->
    //     .then(function (geoResp) {
    //         //add check if city found
    //         if (geoResp.status !== 200) {
    //             requestGood = false;
    //             return null;
    //         } else {
    //             return geoResp.json(); //.json because response is http, but ,json extracts json
    //         }
    //     })
    //     .then(function (geoData) {
    //         if (geoData === null) {
    //             return;
    //         } else {
    //             lat = geoData.lat;
    //             lon = geoData.lon;
    //             weatherRequest();
    //         }
    //     })
    return requestGood;
}

  // use weather API to find all weather data using lat and lon and then populate in

    //color of UV index box change depending on conditions 6 or more is red, 5 or below is green
// function weatherRequest() {
//     fetch(requestUrl) //once request is accepted ->
//         .then(function (response) {
//             //add check if city found
//             return response.json(); //.json because response is http, but ,json extracts json
//         })
//         .then(function (data) {
//             console.log(data);
//         })

// }



