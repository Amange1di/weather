import Rain from "../../assets/Rain.jpeg";
import Clouds from "../../assets/Clouds.jpeg";
import Haze from "../../assets/Haze.jpeg";
import Snow from "../../assets/Snow.jpeg";
import WeatherInfo from "../WeatherInfo/WeatherInfo";
import styles from "./Weather.module.css";
import { useEffect, useState } from "react";
import axios from "axios";

const API_KEY = "&appid=6511e14723ad8cb6f243ece1366c5deb";
const URL = "https://api.openweathermap.org/data/2.5/weather?q=";
const icon_url = "https://openweathermap.org/img/wn/";

const changeBgFon = (weather) => {
  switch (weather) {
    case "Rain":
      return Rain;
    case "Clouds":
      return Clouds;
      case "Haze":
      case "Mist":
      case "Dust":
      return Haze;
    case "Snow":
      return Snow;
    
  }
};

const Weather = () => {
  const [city, setCity] = useState(null);
  const [currentDate, setCurrentDate] = useState("");

  const getWeather = async (cityName = "Osh") => {
    try {
      const { data } = await axios.get(URL + cityName + API_KEY);
      setCity(data);
    } catch (error) {
      console.error("Error fetching the weather data", error);
    }
  };

  useEffect(() => {
    getWeather();
   
    updateCurrentDate();
  }, []);

  const updateCurrentDate = () => {
    const date = new Date();
    const hour = ("0" + date.getHours()).slice(-2);
    const minute = ("0" + date.getMinutes()).slice(-2);
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][date.getDay()];
    const day = ("0" + date.getDate()).slice(-2);
    const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][date.getMonth()];
    const year = date.getFullYear().toString().slice(-2);
    setCurrentDate(`${hour}:${minute} - ${weekday}, ${day} ${month} ${year}`);
  };

  if (!city) {
    return <h1>Loading...</h1>;
  }

  const backgroundImage = changeBgFon(city.weather[0].main);

  return (
    <div
      className={styles.weather__app}
      style={{
        background: `url(${backgroundImage}) no-repeat center/cover`,
      }}
    >
      <div
        className="container"
        style={{
          height: "100vh",
          width: "100%",
        }}
      >
        <div className={styles.weather_text}>
          <h1>{Math.round(city.main.temp - 273.15)}°</h1>
          <div className={styles.city_name}>
            <h5>{city.name}</h5>
          
            <p>{currentDate}</p>
          </div>
          <div>
            <img src={icon_url + city.weather[0].icon + "@4x.png"} alt="Weather Icon" />
            <p>{city.weather[0].main}</p>
          </div>
        </div>
      </div>
      <WeatherInfo getWeather={getWeather} city={city} />
    </div>
  );
};

export default Weather;
