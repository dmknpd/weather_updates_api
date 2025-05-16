const nodemailer = require("nodemailer");
const transporter = require("../config/mail");

exports.sendConfirmationEmail = async (email, city, confirmationToken) => {
  const confirmationLink = `${process.env.HOST}:${process.env.PORT}/api/confirm/${confirmationToken}`;
  const mailOptions = {
    from: process.env.MAIL_USER,
    to: email,
    subject: "Confirm your weather subscription",
    html: `
      <h2>Weather Subscription Confirmation</h2>
      <p>You have requested to subscribe to weather updates for <strong>${city}</strong>.</p>

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

exports.sendUnsubscribeEmail = async (email, city, unsubscribeToken) => {
  const unsubscribeLink = `${process.env.HOST}:${process.env.PORT}/api/unsubscribe/${unsubscribeToken}`;
  const mailOptions = {
    from: process.env.MAIL_USER,
    to: email,
    subject: "Your Weather Subscription is Confirmed",
    html: `
      <h2>Subscription Confirmed</h2>
      <p>Your subscription to weather updates for <strong>${city}</strong> has been successfully confirmed.</p>

      <p>If you wish to <b>unsubscribe</b> from these updates at any time, please click the link below:</p>
      <a href="${unsubscribeLink}">${unsubscribeLink}</a>

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
