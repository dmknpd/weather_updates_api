const weatherService = require("../services/weatherService");

exports.getWeather = async (req, res) => {
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ error: "City parameter is required" });
  }

  try {
    const weatherData = await weatherService.currentWeather(city);

    res.json(weatherData);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
