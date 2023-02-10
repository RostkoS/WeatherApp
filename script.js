
const weatherDOM = document.querySelector(".weather");
const weatherInfo = document.getElementById("weather-info")
const image = document.getElementById("image");
let weather = {
    //apikey for openweathermap
    apiKey: "5979370b91b036a0349e8aa87eb9c42f",

    //getting data from openweathermap
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" +
            city +
            "&units=metric&appid=" +
            this.apiKey
        )
            .then((response) => {
                if (!response.ok) {
                    alert("No weather found.");
                    throw new Error("No weather found.");
                }
                return response.json();
            })
            .then((data) => this.displayWeather(data));
    },

    // displaying weather data received
    displayWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        weatherInfo.innerHTML = '';
        weatherInfo.innerHTML += "<h2 class='city'>Weather in "+name +" </h2>";
        weatherInfo.innerHTML += " <h1 class='temp'>" + temp + "°C</h1>"
        weatherInfo.innerHTML += " <div class='flex'><img src = 'https://openweathermap.org/img/wn/" + icon + ".png' alt ='description' class='icon' /> <div class='description'>" + description + "</div></div >"
        weatherInfo.innerHTML += "<div class='humidity'> <img class='humidity-icon' src ='icons/humidity.png'/><div class='humidity-info'>" + humidity + "%</div> </div >";
        weatherInfo.innerHTML += "<div class='wind'> <img class='wind-icon' src ='icons/wind.png'/><div class='wind-info'>" + speed + "km/h</div> </div >";
        image.src = "https://source.unsplash.com/1000x900/?"+name;
    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    },
};

// -- Event listeners --
//searching by using searchbutton
document.querySelector(".search button").addEventListener("click",  () => {
    weather.search();
    });
//searching by clicking Enter
document.querySelector(".search-bar")
    .addEventListener("keyup",  (event) => {
        if (event.key === "Enter") {
            weather.search();
        }
    });
//converting temprature value by clicking it

weatherInfo.addEventListener("click", (event) => {
   
    if (event.target.classList.contains('temp')) {
        let temprature = event.target;
        let text = event.target.innerText;
        let length = text.length;
        if (text[length - 1] === "C") {
            let temp = text.slice(0, text.indexOf('°'));
            temprature.innerText = ((temp * 9 / 5) + 32).toFixed(2) + "°F";
        } else if (text[length - 1] === "F") {
            let temp = text.slice(0, text.indexOf('°'));
            temprature.innerText = (((temp - 32) * 5) / 9).toFixed(2) + "°C";
        }
    }
})
//default weather search
weather.fetchWeather("kyiv");