require('dotenv').config();

const nodemailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport');

//configure transportor options
const auth = {
  auth: {
    api_key: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
  },
};

const transporter = nodemailer.createTransport(mailGun(auth));

const sendMail = (email, text, cb) => {
  //(email, subject, text, cb)
  const mailOptions = {
    from: email,
    to: process.env.MY_EMAIL,
    subject: 'edu.neto@icloud.com',
    text,
  };

  transporter.sendMail(mailOptions, function(err, data) {
    if (err) {
      // console.log("error")
      return cb(err, null);
    } else {
      return cb(null, data);
      console.log('Invitation sent!!');
    }
  });
};

module.exports = sendMail;
