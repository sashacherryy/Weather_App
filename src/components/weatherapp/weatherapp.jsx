import "./weatherapp.css";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { search_icon, cloud_icon, humidity_icon, wind_icon } from "../assets/img";

function Weatherapp() {
  const [inputValue, setInputValue] = useState("");
  const [weatherData, setWeatherData] = useState({});
  const [weatherIcon, setWeatherIcon] = useState(cloud_icon);

  const api_key = "e5a061978fc8882ba93e937c638eb04a";

  const weatherIconMap = {
    "01d": cloud_icon,
    "01n": cloud_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": cloud_icon,
    "04n": cloud_icon,
    "09d": cloud_icon, 
    "09n": cloud_icon, 
    "10d": cloud_icon, 
    "10n": cloud_icon, 
    "13d": cloud_icon, 
    "13n": cloud_icon, 
  };

  useEffect(() => {
    async function fetchLocation() {
      try {
        const response = await fetch("https://geolocation-db.com/json/");
        const data = await response.json();
        setInputValue(data.city);
      } catch (error) {
        console.log(error);
      }
    }

    fetchLocation();
  }, []);

  useEffect(() => {
    async function fetchWeather() {
      try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${api_key}&units=metric`;
        const response = await fetch(url);
        const weatherJson = await response.json();
        setWeatherData(weatherJson);

        const iconCode = weatherJson.weather[0]?.icon;
        const icon = weatherIconMap[iconCode] || cloud_icon;
        setWeatherIcon(icon);
      } catch (error) {
        console.log(error);
      }
    }

    const searchTimeout = setTimeout(() => {
      if (inputValue) {
        fetchWeather();
      }
    }, 500);

    return () => clearTimeout(searchTimeout);
  }, [inputValue, api_key, weatherIconMap]);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="container">
      <div className="top-bar">
        <TextField
          id="standard-basic"
          value={inputValue}
          onChange={handleChange}
          variant="standard"
          className="cityInput"
          label="City" 
        />
        <div className="search-icon">
          <img src={search_icon} alt="search" />
        </div>
      </div>
      <div className="weather-image">
        <img src={weatherIcon} alt="weather" />
      </div>
      <div className="weather-temp">{Math.ceil(weatherData.main?.temp) || ""}°C</div>
      <div className="weather-location">{weatherData.name}</div>
      <div className="data-container">
        <div className="element">
          <img src={humidity_icon} alt="humidity" className="icon" />
          <div className="data">
            <div className="humidity-percent">{weatherData.main?.humidity} %</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind_icon} alt="wind" className="icon" />
          <div className="data">
            <div className="wind-rate">{weatherData.wind?.speed} km/h</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Weatherapp;
