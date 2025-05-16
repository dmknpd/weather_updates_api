const axios = require("axios");

const { validateCity } = require("../utils/cityUtils");

const WEATHER_API_URL = "http://api.weatherapi.com/v1";
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

exports.currentWeather = async (city) => {
  try {
    const response = await axios.get(`${WEATHER_API_URL}/current.json`, {
      params: {
        key: WEATHER_API_KEY,
        q: city,
      },
    });

    const { location, current } = response.data;

    validateCity(city, location.name);

    return {
      temperature: current.temp_c,
      humidity: current.humidity,
      description: current.condition.text,
    };
  } catch (error) {
    throw new Error("Invalid request");
  }
};
