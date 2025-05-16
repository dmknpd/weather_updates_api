const sequelize = require("../config/db");
const Subscription = require("../models/subscription");
const { generateToken } = require("../utils/tokenUtils");
const emailService = require("./emailService");
const weatherService = require("./weatherService");

exports.subscribe = async (email, city, frequency) => {
  try {
    await weatherService.currentWeather(city);
  } catch (error) {
    throw new Error(`City validation failed: ${error.message}`);
  }

  const existingSubscription = await Subscription.findOne({
    where: { email, city },
  });

  if (existingSubscription) {
    throw new Error("Email already subscribed to updates for this city");
  }

  const transaction = await sequelize.transaction(); //transaction

  try {
    const confirmationToken = generateToken({ email, city, frequency });

    const newSubscription = await Subscription.create(
      {
        email,
        city,
        frequency,
        confirmationToken,
      },
      { transaction }
    );

    await emailService.sendConfirmationEmail(email, city, confirmationToken);

    await transaction.commit(); //transaction commit

    return newSubscription;
  } catch (error) {
    await transaction.rollback(); //transaction rollback

    throw new Error("Subscription failed: " + error.message);
  }
};
