const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // use TLS
  auth: {
    user: "kishanmitra315@gmail.com",
    pass: "hbxmoyzdfduwgnnh"
  },
  tls: {
    rejectUnauthorized: false
  }
});

module.exports = transporter;