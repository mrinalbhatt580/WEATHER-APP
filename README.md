🌤️ Weather App (Frontend)

A modern, responsive Weather Application built using HTML, CSS, and JavaScript, featuring:

✔ Real-time weather data
✔ 5-day forecast
✔ Day/Night dynamic UI
✔ Geolocation-based weather
✔ Smooth UI animations & glassmorphism design

This project was created as part of an internship frontend assignment.

🚀 Demo

👉 Host the project using GitHub Pages and place the link here.

📌 Features
🔍 Search Weather by City

Fetches weather using OpenWeather API

Displays temperature, humidity, wind speed, sunrise, sunset

📍 Use My Location

Auto-detects your current position using Geolocation API

Fetches local weather instantly
(Uses logic from script.js geolocation function) 

31afa578-48de-4d6e-a060-a949204…

🌗 Automatic Day/Night Mode

Background gradient changes based on local sunrise/sunset time

Weather icons change for day & night
(Handled inside applyDayNightMode() and icon maps)


31afa578-48de-4d6e-a060-a949204…

📅 5-Day Weather Forecast

Extracts data for 12:00 PM each day

Displays weekday, icon, and temperature
(logic from fetchForecast())


31afa578-48de-4d6e-a060-a949204…

✨ Modern UI

Glassmorphism card

Hover effects

Smooth transitions & fade-in animations
(CSS from styles.css)


00d3ca18-5159-4d7a-84d1-60d18cc…

🛠️ Tech Stack
Technology	Usage
HTML5	Page structure
CSS3	UI design, glassmorphism, animations
JavaScript (Vanilla JS)	Fetch API, DOM updates, geolocation
OpenWeather API	Weather & forecast data
📡 API Used
OpenWeather API

Endpoints used in project:

Current Weather:
https://api.openweathermap.org/data/2.5/weather?q={city}&units=metric&appid={apikey}

Forecast (5 day):
https://api.openweathermap.org/data/2.5/forecast?q={city}&units=metric&appid={apikey}

Geolocation Weather:
https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&units=metric&appid={apikey}

📁 Project Structure
/
│── index.html
│── styles.css
│── script.js
└── /images
      ├── clear.png
      ├── clouds.png
      ├── rain.png
      ├── drizzle.png
      ├── mist.png
      ├── snow.png
      ├── moon_clear.png
      ├── moon_clouds.png
      ├── moon_rain.png
      └── ...other icons

💡 How It Works
1️⃣ User enters a city

→ checkWeather() fetches data & updates UI


31afa578-48de-4d6e-a060-a949204…

2️⃣ If invalid city → show error

→ Handled by showError()


31afa578-48de-4d6e-a060-a949204…

3️⃣ On success

Temperature, humidity, wind

Sunrise, sunset (converted from UNIX time)

Weather icons

Day/Night theme
→ All updated inside updateUI()


31afa578-48de-4d6e-a060-a949204…

4️⃣ Fetch 5-day forecast

→ Uses filtered 12 PM entries from OpenWeather


31afa578-48de-4d6e-a060-a949204…

📸 Screenshots (Optional)

Add screenshots here after deploying.

⚙️ Setup Instructions
🔧 1. Clone the repo
git clone https://github.com/your-username/weather-app.git

🔧 2. Open the project

Just open index.html in any browser.

🔧 3. Add your API key

Inside script.js:

const apikey = "YOUR_API_KEY_HERE";

📌 Future Improvements

Add hourly forecast

Add temperature unit toggle (°C ↔ °F)

Add weather alerts

PWA support (Install as app)

🤝 Contributing

Pull requests are welcome!

📄 License

This project is open-source under the MIT License.