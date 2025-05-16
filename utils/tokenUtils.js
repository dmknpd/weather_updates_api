const crypto = require("crypto");

exports.generateToken = (payload) => {
  return crypto.randomBytes(20).toString("hex");
};

exports.isValidToken = (token) => {
  return (
    typeof token === "string" &&
    token.length === 40 &&
    /^[a-f0-9]+$/.test(token)
  );
};
