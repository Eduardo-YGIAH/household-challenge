require('dotenv').config();
const mailgunLoader = require("mailgun-js");

let mailgun = mailgunLoader({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN
});

const sendMail = (to, from, subject, content) => {
  let mailOptions = {
    to,
    from,
    subject,
    text: content
  };
  return mailgun.messages().send(mailOptions);
}

module.exports = { sendMail };
