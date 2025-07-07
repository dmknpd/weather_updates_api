const transporter = require("../config/mail");

const baseLink = `${process.env.FRONTEND_HOST}:${process.env.FRONTEND_PORT}`;

exports.sendConfirmationEmail = async (
  email,
  city,
  frequency,
  confirmationToken
) => {
  const confirmationLink = `${baseLink}/confirmation/${confirmationToken}`;
  const mailOptions = {
    from: process.env.MAIL_USER,
    to: email,
    subject: "Confirm your weather subscription",
    html: `
      <h2>Weather Subscription Confirmation</h2>
      <p>You have requested to subscribe to <b>${frequency}</b> weather updates for <strong>${city}</strong>.</p>

      <p>Please confirm your <b>subscription</b> by clicking the link below:</p>
      <a href="${confirmationLink}">${confirmationLink}</a>

      <p>If you did not request this subscription, please disregard this email.</p>
      <p>Best regards,<br>The Weather Updates Team</p>

    `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending confirmation email:", error.message);
    throw new Error("Failed to send confirmation email");
  }
};

exports.sendUnsubscribeEmail = async (
  email,
  city,
  frequency,
  unsubscribeToken
) => {
  const unsubscribeLink = `${baseLink}/unsubscribe/${unsubscribeToken}`;
  const mailOptions = {
    from: process.env.MAIL_USER,
    to: email,
    subject: "Your Weather Subscription is Confirmed",
    html: `
      <h2>Subscription Confirmed</h2>
      <p>Your subscription to <b>${frequency}</b> weather updates for <strong>${city}</strong> has been successfully confirmed.</p>

      <p>If you wish to <b>unsubscribe</b> from these updates at any time, please click the link below:</p>
      <a href="${unsubscribeLink}" style="color: gray; text-decoration: underline; font-size: 0.9em;"><b>Unsubscribe link</b></a>

      <p>Thank you for staying with us!</p>
      <p>Best regards,<br>The Weather Updates Team</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending confirmation email:", error.message);
    throw new Error("Failed to send confirmation email");
  }
};

exports.sendWeatherUpdate = async (
  email,
  city,
  frequency,
  unsubscribeToken,
  weatherData
) => {
  const unsubscribeLink = `${baseLink}/unsubscribe/${unsubscribeToken}`;
  const mailOptions = {
    from: process.env.MAIL_USER,
    to: email,
    subject: `Your ${frequency} weather update for ${city}`,
    html: `
      <p>Your <b>${frequency}</b> weather update for <b>${city}</b>:</p>
      <ul>
        <li>Temperature: <b>${weatherData.temperature}°C</b></li>
        <li>Humidity: <b>${weatherData.humidity}%</b></li>
        <li>Description: <b>${weatherData.description}</b></li>
      </ul>

      <p>If you wish to <b>unsubscribe</b> from these updates at any time, please click the link below:</p>
      <a href="${unsubscribeLink}" style="color: gray; text-decoration: underline; font-size: 0.9em;"><b>Unsubscribe link</b></a>

      <p>Thank you for staying with us!</p>
      <p>Best regards,<br>The Weather Updates Team</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Weather update sent to ${email} for ${city}`);
  } catch (error) {
    console.error(
      `Error sending weather update to ${email} for ${city}:`,
      error
    );
  }
};
