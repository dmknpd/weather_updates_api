const nodemailer = require("nodemailer");
const transporter = require("../config/mail");

exports.sendConfirmationEmail = async (email, city, token) => {
  const confirmationLink = `${process.env.HOST}:${process.env.PORT}/api/confirm/${token}`;
  const mailOptions = {
    from: process.env.MAIL_USER,
    to: email,
    subject: "Confirm your weather subscription",
    html: `
      <h2>Weather Subscription Confirmation</h2>
      <p>Thank you for subscribing to weather updates for <strong>${city}</strong>.</p>
      <p>Please click the link below to confirm your subscription:</p>
      <a href="${confirmationLink}">${confirmationLink}</a>
      <p>If you did not request this subscription, please ignore this email.</p>
      <p>Best regards,<br>Weather Updates Team</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending confirmation email:", error.message);
    throw new Error("Failed to send confirmation email");
  }
};
