const apikey = "6c5f48f7382dc6ab36793f80b04d4dc6";
const api_url = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const locBtn = document.querySelector(".loc-btn"); 

document.querySelector(".loading").style.display = "none";

async function checkWeather(city) {

    // Prevent empty input
    if (!city.trim()) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".error p").innerText = "Please enter a city name";
        document.querySelector(".weather").style.display = "none";
        document.querySelector(".loading").style.display = "none";
        return;
    }

    // Show loading message
    document.querySelector(".loading").style.display = "block";
    document.querySelector(".weather").style.display = "none";
    document.querySelector(".error").style.display = "none";

    const response = await fetch(api_url + city + `&appid=${apikey}`);

    // Hide loading message
    document.querySelector(".loading").style.display = "none";

    // Handle ALL bad responses
    if (!response.ok) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        return;
    } else {
        document.querySelector(".error").style.display = "none";
    }

    const data = await response.json();
    updateUI(data);
}

// Reusable UI update
function updateUI(data) {
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    // Convert weather type to lowercase
    const weatherType = data.weather[0].main.toLowerCase();

    // Improved icon mapping
    const iconMap = {
        clouds: "images/clouds.png",
        clear: "images/clear.png",
        rain: "images/rain.png",
        drizzle: "images/drizzle.png",
        mist: "images/mist.png",
        snow: "images/snow.png",
        haze: "images/mist.png",
        fog: "images/mist.png",
        smoke: "images/mist.png",
        thunderstorm: "images/rain.png"
    };
    
    // Set icon (fallback = clear)
    weatherIcon.src = iconMap[weatherType] || "images/clear.png";

    document.querySelector(".weather").style.display = "block";
}

//GEOLOCATION WEATHER
locBtn.addEventListener("click", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert("Geolocation is not supported by your browser.");
    }
});

async function showPosition(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    document.querySelector(".loading").style.display = "block";
    document.querySelector(".weather").style.display = "none";
    document.querySelector(".error").style.display = "none";

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apikey}`;
    const response = await fetch(url);
    const data = await response.json();

    document.querySelector(".loading").style.display = "none";
    updateUI(data);
}

function showError(error) {
    alert("Unable to fetch your location.");
}


// Search button click
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

// Press Enter to search
searchBox.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        checkWeather(searchBox.value);
    }
});
