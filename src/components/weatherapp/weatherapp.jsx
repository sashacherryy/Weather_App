import "./weatherapp.css";
import { Input } from "@mui/material";

import {
  search_icon,
  clear_icon,
  cloud_icon,
  drizzle_icon,
  rain_icon,
  snow_icon,
  wind_icon,
  humidity_icon,
} from "../assets/img";
import TextField from "@mui/material/TextField";
import { useState } from "react";

function Weatherapp() {
  const [inputValue, setInputValue] = useState();
  const [wicon, setWicon] = useState(cloud_icon);

  let api_key = "e5a061978fc8882ba93e937c638eb04a";

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };
  const search = async () => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${api_key}&units=Metric`;

    let response = await fetch(url);
    let data = await response.json();

    const humidity = document.getElementsByClassName("humidity-percent");
    const wind = document.getElementsByClassName("wind-rate");
    const tempreature = document.getElementsByClassName("weather-temp");
    const location = document.getElementsByClassName("weather-location");

    humidity[0].innerHTML = data.main.humidity + " %";
    wind[0].innerHTML = data.wind.speed + " km/h";
    tempreature[0].innerHTML = Math.ceil(data.main.temp) + "	°C";
    location[0].innerHTML = data.name + "";

    if (data.weather[0].icon === "01d" ||
        data.weather[0].icon === "01n") {
      setWicon(clear_icon);
    } else if (
      data.weather[0].icon === "02d" ||
      data.weather[0].icon === "02n"
    ) {
      setWicon(cloud_icon);
    } else if (
      data.weather[0].icon === "03d" ||
      data.weather[0].icon === "03n"
    ) {
      setWicon(drizzle_icon);
    } else if (
      data.weather[0].icon === "04d" ||
      data.weather[0].icon === "04n"
    ) {
      setWicon(drizzle_icon);
    } else if (
      data.weather[0].icon === "09d" ||
      data.weather[0].icon === "09n"
    ) {
      setWicon(rain_icon);
    } else if (
      data.weather[0].icon === "10d" ||
      data.weather[0].icon === "10n"
    ) {
      setWicon(rain_icon);
    } else if (
      data.weather[0].icon === "13d" ||
      data.weather[0].icon === "13n"
    ) {
      setWicon(snow_icon);
    } else {
      setWicon(clear_icon);
    }
  };
  return (
    <>
      <div className="container">
        <div className="top-bar">
          <TextField
            id="standard-basic"
            label="Standard"
            value={inputValue}
            onChange={handleChange}
            variant="standard"
            className="cityInput"
          />
          <div className="search-icon" onClick={search}>
            <img src={search_icon} alt="search" />
          </div>
        </div>
        <div className="weather-image">
          <img src={wicon} alt="cloud" />
        </div>
        <div className="weather-temp">24`C</div>
        <div className="weather-location">London</div>
        <div className="data-container">
          <div className="element">
            <img src={humidity_icon} alt="" className="icon" />
            <div className="data">
              <div className="humidity-percent">64%</div>
              <div className="text">Humidity</div>
            </div>
          </div>
          <div className="element">
            <img src={wind_icon} alt="" className="icon" />
            <div className="data">
              <div className="wind-rate">18 km/h</div>
              <div className="text">Wind Speed</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Weatherapp;
