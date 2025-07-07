import { useState } from "react";
import axios from "axios";

import Search from "../../components/Search/Search";
import WeatherInfo from "../../components/WeatherInfo/WeatherInfo";

import styles from "./MainPage.module.css";
const MainPage = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({});
  const [error, setError] = useState("");

  const handleSetCity = (e) => {
    setCity(e.target.value);
  };

  const getWeather = async (e) => {
    e.preventDefault();
    setError("");

    const cityName = capitalize(city.trim());
    console.log(cityName);

    try {
      const response = await axios.get(
        `http://localhost:5000/api/weather?city=${cityName}`
      );

      setWeather({ ...response.data, city: cityName });
      setCity("");
    } catch (e) {
      setError(e.status);
    }
  };

  const capitalize = (string) => {
    if (!string) return "";
    return string[0].toUpperCase() + string.slice(1).toLowerCase();
  };

  return (
    <main className={styles.main}>
      <Search
        city={city}
        handleSetCity={handleSetCity}
        getWeather={getWeather}
      />

      <WeatherInfo weather={weather} error={error} />
    </main>
  );
};

export default MainPage;
