const subscriptionService = require("../services/subscriptionService");

exports.subscribe = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ error: "Invalid input" });
  }

  const { email, city, frequency } = req.body;

  if (!email || !city || !frequency) {
    return res.status(400).json({ error: "Invalid input" });
  }

  try {
    await subscriptionService.subscribe(email, city, frequency);
    return res.status(200).json({
      message: "Subscription successful. Confirmation email sent.",
    });
  } catch (error) {
    if (error.message.includes("Email already subscribed")) {
      return res.status(409).json({ error: "Email already subscribed" });
    } else {
      return res.status(400).json({ error: "Invalid input" });
    }
  }
};

exports.confirmSubscription = async (req, res) => {
  const { token } = req.params;

  try {
    await subscriptionService.confirmSubscription(token);
    res.status(200).json({ message: "Subscription confirmed successfully" });
  } catch (error) {
    if (error.message === "Token not found") {
      return res.status(404).json({ error: "Token not found" });
    }
    console.error("Confirmation error:", error.message);
    return res.status(400).json({ error: "Invalid token" });
  }
};
