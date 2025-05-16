const sequelize = require("../config/db");
const Subscription = require("../models/subscription");
const { generateToken, isValidToken } = require("../utils/tokenUtils");
const emailService = require("./emailService");

exports.subscribe = async (email, city, frequency) => {
  const existingSubscription = await Subscription.findOne({
    where: { email, city },
  });

  if (existingSubscription) {
    throw new Error("Email already subscribed");
  }

  try {
    const confirmationToken = generateToken();

    const newSubscription = await Subscription.create({
      email,
      city,
      frequency,
      confirmationToken,
    });

    await emailService.sendConfirmationEmail(email, city, confirmationToken);

    return newSubscription;
  } catch (error) {
    console.error("Subscription failed: ", error.message);
    throw new Error("Subscription failed");
  }
};

exports.confirmSubscription = async (confirmationToken) => {
  if (!isValidToken(confirmationToken)) {
    throw new Error("Invalid token");
  }

  try {
    const subscription = await Subscription.findOne({
      where: { confirmationToken },
    });

    if (!subscription) {
      throw new Error("Token not found");
    }

    if (subscription.confirmed) {
      return;
    }

    const unsubscribeToken = generateToken();

    await subscription.update({
      confirmed: true,
      confirmationToken: null,
      unsubscribeToken: unsubscribeToken,
    });

    await emailService.sendUnsubscribeEmail(
      subscription.email,
      subscription.city,
      unsubscribeToken
    );

    return subscription;
  } catch (error) {
    console.error("Error confirming subscription: ", error.message);
    throw new Error("Token not found");
  }
};

exports.unsubscribe = async (unsubscribeToken) => {
  if (!isValidToken(unsubscribeToken)) {
    throw new Error("Invalid token");
  }

  try {
    const subscription = await Subscription.findOne({
      where: { unsubscribeToken },
    });

    if (!subscription) {
      throw new Error("Token not found");
    }

    await subscription.destroy();
  } catch (error) {
    console.error("Error deleting subscription: ", error.message);
    throw new Error("Token not found");
  }
};
