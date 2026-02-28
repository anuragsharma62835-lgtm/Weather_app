import {  useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const api_key = import.meta.env.VITE_WEATHER_API_KEY;
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");

  async function getWeather() {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`
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
              <h2>name: {weather.name}</h2>
              <p>Temp: {weather.main.temp} C</p>
              <p>sky: {weather.weather[0].description}</p>
              <p>description: {weather.weather[0].main}</p>
            </div>
          ) : (
            <div>
              <h2>enter city name...</h2>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
