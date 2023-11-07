const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "nosafespot@gmail.com",
    pass: "ywlxxeaxptipoxic",
  },
});

module.exports = transporter;
