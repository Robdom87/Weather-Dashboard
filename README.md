# Weather-Dashboard

##Description
The weather dashboard allows user to search for the current day weather conditions for a city as well as view the forecasted weather conditions in that city for the next 5 days. The site is divided into two sections: the search area and the weather area.

The search area allows the user to input the city whose weather should be viewed. After each search, the search input will be saved as a button appearing below the search section. These historical buttons when clicked display the cities weather information. The search history is limited to the 8 latest searches.

The weather sections consists of two areas: the current day weather information and forecast boxes for the next 5 days. 

##Deployed Link
https://robdom87.github.io/Weather-Dashboard/

##Screenshot
![The weather dashboard page displays current weather conditions for a city as well as 5 day forecast.](./Assets/Weather%20Dashboard.gif)

##Resources
OpenWeatherMap API
GeoCoding API
jQuery
Bootstrap
Day.js

The GeoCoding API was used to find the latitiude and longititude of a city, as these were required input for the OpenWeatherMap API. The OpenWeatherMap API provided all the relevant weather information used within the dashboard. 

Day.js was used to format the unix time code provided by the OpenWeatherMap API. jQuery and Bootstrap were used for styling and DOM manipulation.