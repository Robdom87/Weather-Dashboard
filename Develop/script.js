var city = "";
var requestUrl = "http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=36475aa6e6360c06a75febf0d999bfb7";
var prevSearches = [];

$(".btn").click(function(){
    //check if input is not blank
    city = $(".form-control").val();

    // geoRequest();

    console.log(prevSearches.length);

    if (prevSearches.length === 8) {
        prevSearches.pop();
    }
    prevSearches.unshift(city);
    console.log(prevSearches)
    localStorage.setItem('searchHistory', JSON.stringify(prevSearches));
    

    $(".form-control").val("");
    
    displaySearches();
    //add functionality to the search button and dynamically display all previous searches


    //save in local storage, limit of 8

    // use geo API to find lat and lon with city input

    // use weather API to find all weather data using lat and lon and then populate in 

    //color of UV index box change depending on conditions 6 or more is red, 5 or below is green
})

// $("li").click(function(){})

function displaySearches () {
    //erase previous buttons
    prevSearches = JSON.parse(localStorage.getItem("searchHistory"));
    if (prevSearches !== null) {
    for (var i = 0; i < prevSearches.length; i++) {
            var histBtn = $("<li>").text(prevSearches[i]);
            $("ul").append(histBtn);
        }
    } else {
        return;
    }
};

displaySearches();









// function geoRequest () {
//     fetch(requestUrl) //once request is accepted ->
//     .then(function (response) {
//         //add check if city found
//         return response.json(); //.json because response is http, but ,json extracts json
//     })
//     .then(function (data) {  
//         console.log(data);
//     })

// }



