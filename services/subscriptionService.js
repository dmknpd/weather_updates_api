const sequelize = require("../config/db");
const Subscription = require("../models/subscription");
const { generateToken } = require("../utils/tokenUtils");
const emailService = require("./emailService");

exports.subscribe = async (email, city, frequency) => {
  const existingSubscription = await Subscription.findOne({
    where: { email, city },
  });

  if (existingSubscription) {
    throw new Error("Email already subscribed");
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

    console.error("Subscription failed:", error.message);
    throw new Error("Subscription failed");
  }
};
