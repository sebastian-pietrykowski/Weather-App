(function(){
    getCoordinates("Warsaw");
})();

function setWeather() {
    var cityName = document.getElementById("city-text-field").value;
    getCoordinates(cityName);
}

function getCoordinates(cityName) {
        let url = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=1&appid=f333ef88d3024b885dfaf53ac2af0fc2";
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("HTTP error: ${response.status}");
                }
                return response.json();
            })
            .then((json) => saveCoordinates(json))
            .then((coordinates) => getWeather(coordinates))
            .catch((error) => console.error("Fetch problem: ${err.message}"));
}

function saveCoordinates(json) {
    
    var coordinates = {};
    coordinates.cityName = json[0].name;
    coordinates.latitude = json[0].lat;
    coordinates.longitude = json[0].lon;
    return coordinates;
}

function getWeather(coordinates) {
    var url = "https://api.openweathermap.org/data/2.5/weather?lat=" +
            coordinates.latitude + "&lon=" + coordinates.longitude +
            "&units=metric&appid=f333ef88d3024b885dfaf53ac2af0fc2";
    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error("HTTP error: ${response.status}");
            }
            return response.json();
        })
        .then((json) => saveWeather(coordinates.cityName, json))
        .then((weather) => updatePage(weather))
        .catch((error) => console.error("Fetch problem: ${err.message}"));
}

function saveWeather(cityName, json) {
    var weather = {};
    weather.main = json.weather[0].main;
    weather.cityName = cityName;
    weather.temperature = json.main.temp;
    return weather;
}

function updatePage(weather) {
    document.getElementById("weather-main").textContent = weather.main;
    document.getElementById("city").textContent = weather.cityName;
    document.getElementById("temperature").textContent = weather.temperature + "\xB0C";
}
