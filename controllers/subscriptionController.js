const subscriptionService = require("../services/subscriptionService");

exports.subscribe = async (req, res) => {
  const { email, city, frequency } = req.body;

  try {
    await subscriptionService.subscribe(email, city, frequency);
    return res
      .status(200)
      .json({
        message: "Subscription created successfully. Please check your email.",
      });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
