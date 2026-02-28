import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const api_key = import.meta.env.VITE_WEATHER_API_KEY;
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");

  async function getWeather() {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`,
      );
      setWeather(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div>
        <div>
          <h1>Weather App</h1>
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={getWeather}>Search</button>

          {weather ? (
            <div>
              <h2>
                {weather.name}, {weather.sys.country}
              </h2>

              <h2>{weather.main.temp} °C</h2>
              <p>{weather.weather[0].description}</p>

              <p>Feels Like: {weather.main.feels_like} °C</p>
              <p>Humidity: {weather.main.humidity}%</p>
              <p>Pressure: {weather.main.pressure} hPa</p>
              <p>Wind Speed: {weather.wind.speed} m/s</p>

              <p>
                Sunrise:{" "}
                {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}
              </p>

              <p>
                Sunset:{" "}
                {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}
              </p>
            </div>
          ) : (
            <h2>Enter city name...</h2>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
