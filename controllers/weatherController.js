exports.getWeather = async (req, res) => {
  const { city } = req.query;

  res.json({
    city,
  });
};
