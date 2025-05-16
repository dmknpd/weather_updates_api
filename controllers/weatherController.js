const weatherService = require("../services/weatherService");

exports.getWeather = async (req, res) => {
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ error: "Invalid request" });
  }

  try {
    const weatherData = await weatherService.currentWeather(city);

    res.status(200).json(weatherData);
  } catch (error) {
    res.status(404).json({ error: "City not found" });
  }
};
