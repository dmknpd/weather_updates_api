const crypto = require("crypto");

exports.generateToken = (payload) => {
  return crypto.randomBytes(20).toString("hex");
};
