# WEATHER-APP
THIS APP WILL GIVE YOU LIVE WEATHER OF WHICHEVER CITY YOU WANT IN REAL TIME.

🌤️ Weather App

A clean, responsive weather application built using HTML, CSS, and JavaScript, powered by the OpenWeatherMap API.
The app allows users to search weather by city name and also fetch weather using current location (Geolocation API).

📌 Features
🔍 City-Based Weather Search

Users can enter any city name to instantly view:

Temperature

City name

Humidity

Wind speed

Relevant weather icon based on condition
(From logic in updateUI() where weather mapping is implemented) 


📍 Use My Location

With one click, the app:

Retrieves the user’s latitude & longitude via the Geolocation API

Fetches weather data for the current coordinates
(Handled in showPosition() and locBtn event listener)


⚡ Real-Time Status Messages

App includes:

Loading state

Error handling

Invalid city name detection
(See checkWeather() for validation and UI state changes) 

🎨 Modern UI

A smooth, gradient-based UI with:

Responsive design

Rounded inputs

Hover effects

Professional weather card design
(Defined in styles.css) 

🚀 Tech Used

HTML5 — App layout and component structure 
CSS3 — Full styling for card, button, layout, responsiveness 
JavaScript (ES6) — API calls, UI updates, geolocation logic, event handling 
OpenWeatherMap API — Weather data provider
Geolocation API — Get live user location


🧠 How It Works
1️⃣ User enters a city → checkWeather() is triggered

Validates input

Shows loading

Fetches data from OpenWeatherMap

Updates UI via updateUI() 

ae57e66b-e204-4a1e-933b-a1daa42…

2️⃣ User clicks “Use My Location”

Browser retrieves coordinates

Weather is fetched using latitude & longitude

Smoothly updates the UI

3️⃣ Weather Icons

Weather conditions like clouds, rain, clear, etc. are mapped to icons via an icon map object.



🛠️ Setup & Usage

Clone the repository:

git clone .....


Open the project folder:

cd weather-app


Replace the OpenWeatherMap API Key in script.js:

const apikey = "YOUR_API_KEY_HERE";


Open index.html in your browser.
