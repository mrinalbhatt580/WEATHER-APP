const apikey = "6c5f48f7382dc6ab36793f80b04d4dc6";
const api_url = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const forecast_url = "https://api.openweathermap.org/data/2.5/forecast?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const locBtn = document.querySelector(".loc-btn");
const forecastContainer = document.getElementById("forecast");
const body = document.querySelector("body");

document.querySelector(".loading").style.display = "none";
// -----------------------------------------------------
// MAIN CURRENT WEATHER FETCH
// -----------------------------------------------------
async function checkWeather(city) {

    if (!city.trim()) {
        showError("Please enter a city name");
        return;
    }

    showLoading();

    const response = await fetch(api_url + city + `&appid=${apikey}`);
    document.querySelector(".loading").style.display = "none";

    if (!response.ok) {
        showError("Invalid city name");
        return;
    }

    const data = await response.json();

    updateUI(data);
    applyDayNightMode(data);
    fetchForecast(city);
}
// -----------------------------------------------------
// BUILD THE UI (TEMP, HUMIDITY, WIND, ICONS, SUNRISE…)
// -----------------------------------------------------
function updateUI(data) {

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    const weatherType = data.weather[0].main.toLowerCase();

    // ------------- DAY VS NIGHT DETECTION -------------
    const now = data.dt;
    const sunrise = data.sys.sunrise;
    const sunset = data.sys.sunset;
    const isNight = now < sunrise || now > sunset;

    // ------------- DAY ICONS -------------
    const iconMapDay = {
        clear: "images/clear.png",
        clouds: "images/clouds.png",
        rain: "images/rain.png",
        drizzle: "images/drizzle.png",
        mist: "images/mist.png",
        snow: "images/snow.png",
        haze: "images/mist.png",
        fog: "images/mist.png",
        smoke: "images/mist.png",
        thunderstorm: "images/rain.png"
    };

    // ------------- NIGHT ICONS -------------
    const iconMapNight = {
        clear: "images/moon_clear.png",
        clouds: "images/moon_clouds.png",
        rain: "images/moon_rain.png",
        drizzle: "images/moon_rain.png",
        mist: "images/moon_mist.png",
        snow: "images/moon_snow.png",
        haze: "images/moon_mist.png",
        fog: "images/moon_mist.png",
        smoke: "images/moon_mist.png",
        thunderstorm: "images/moon_rain.png"
    };

    // ----- APPLY ICONS -----
    weatherIcon.src = isNight
        ? iconMapNight[weatherType] || iconMapNight.clear
        : iconMapDay[weatherType] || iconMapDay.clear;

    // ----- SUNRISE + SUNSET -----
    const sunriseEl = document.querySelector(".sunrise");
    const sunsetEl = document.querySelector(".sunset");

    function formatTime(unix) {
        const d = new Date(unix * 1000);
        return d.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
        });
    }

    sunriseEl.innerHTML = formatTime(sunrise);
    sunsetEl.innerHTML = formatTime(sunset);

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
}
// -----------------------------------------------------
// SET DAY / NIGHT BACKGROUND
// -----------------------------------------------------
function applyDayNightMode(data) {
    const now = data.dt;
    const sunrise = data.sys.sunrise;
    const sunset = data.sys.sunset;
    const isNight = now < sunrise || now > sunset;

    const bgMapDay = {
        clear: "linear-gradient(135deg, #fceabb, #f8b500)",
        clouds: "linear-gradient(135deg, #bdc3c7, #2c3e50)",
        rain: "linear-gradient(135deg, #4facfe, #00f2fe)",
        drizzle: "linear-gradient(135deg, #89f7fe, #66a6ff)",
        snow: "linear-gradient(135deg, #e0eafc, #cfdef3)",
        thunderstorm: "linear-gradient(135deg, #2b5876, #4e4376)",
        mist: "linear-gradient(135deg, #606c88, #3f4c6b)",
        fog: "linear-gradient(135deg, #606c88, #3f4c6b)",
        haze: "linear-gradient(135deg, #606c88, #3f4c6b)",
        smoke: "linear-gradient(135deg, #606c88, #3f4c6b)"
    };

    const bgMapNight = {
        clear: "linear-gradient(135deg, #141e30, #243b55)",
        clouds: "linear-gradient(135deg, #232526, #414345)",
        rain: "linear-gradient(135deg, #000428, #004e92)",
        drizzle: "linear-gradient(135deg, #373b44, #4286f4)",
        snow: "linear-gradient(135deg, #636fa4, #e8cbc0)",
        thunderstorm: "linear-gradient(135deg, #141e30, #243b55)",
        mist: "linear-gradient(135deg, #3a3d40, #181719)",
        fog: "linear-gradient(135deg, #3a3d40, #181719)",
        haze: "linear-gradient(135deg, #3a3d40, #181719)",
        smoke: "linear-gradient(135deg, #3a3d40, #181719)"
    };

    const weather = data.weather[0].main.toLowerCase();

    body.style.background = isNight
        ? bgMapNight[weather] || bgMapNight.clear
        : bgMapDay[weather] || bgMapDay.clear;

    body.style.transition = "background 0.8s ease";
}
// -----------------------------------------------------
// 5-DAY FORECAST
// -----------------------------------------------------
async function fetchForecast(city) {
    const response = await fetch(forecast_url + city + `&appid=${apikey}`);
    const data = await response.json();

    forecastContainer.innerHTML = "";

    const filtered = data.list.filter(item =>
        item.dt_txt.includes("12:00:00")
    );

    filtered.slice(0, 5).forEach(day => {
        const date = new Date(day.dt_txt);
        const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
        const temp = Math.round(day.main.temp);
        const weatherType = day.weather[0].main.toLowerCase();

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

        const icon = iconMap[weatherType] || "images/clear.png";

        forecastContainer.innerHTML += `
            <div class="forecast-day">
                <h4>${dayName}</h4>
                <img src="${icon}">
                <p>${temp}°C</p>
            </div>
        `;
    });
}
// -----------------------------------------------------
// LOADING + ERROR
// -----------------------------------------------------
function showLoading() {
    document.querySelector(".loading").style.display = "block";
    document.querySelector(".weather").style.display = "none";
    document.querySelector(".error").style.display = "none";
}

function showError(msg) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".error p").innerText = msg;
    document.querySelector(".weather").style.display = "none";
    document.querySelector(".loading").style.display = "none";
}
// -----------------------------------------------------
// GEOLOCATION
// -----------------------------------------------------
locBtn.addEventListener("click", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, () =>
            alert("Unable to fetch your location.")
        );
    }
});

async function showPosition(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    showLoading();

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apikey}`;
    const response = await fetch(url);
    const data = await response.json();

    document.querySelector(".loading").style.display = "none";

    updateUI(data);
    applyDayNightMode(data);
    fetchForecast(data.name);
}
// -----------------------------------------------------
// SEARCH HANDLING
// -----------------------------------------------------
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

searchBox.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        checkWeather(searchBox.value);
    }
});
