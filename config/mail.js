require('dotenv').config();
const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const mail = (email, cb) => {
  const mailInfo = {
    from: '"Household Owner" <no-reply@test.com',
    to: email,
    subject: '*** Household Invitation ***',
    text: `Come and join our household!`
  }

  transporter.sendMail(mailInfo, (error, data) => {
    if(error){
      console.log(error)
      cb(error, null);
    } else {
      console.log(mailInfo)
      cb(null, data);
      // console.log("Message sent: %s", mailInfo.messageId);
      // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(mailInfo));
    }
  });
};

module.exports = mail;


/*--------------------------------------------------------------*/

// require('dotenv').config()
// const nodemailer = require('nodemailer');
// const mailGun = require('nodemailer-mailgun-transport');

// const auth = {
//   auth: {
//     apiKey:process.env.MAILGUN_API_KEY,
//     domain:process.env.MAILGUN_DOMAIN
//   }
// };

// const transporter = nodemailer.createTransport(mailGun(auth));


// const sendMail = () => {
//   const mailOptions = {
//     from: 'Household Owner <no-reply@test.com>',
//     to: process.env.MY_EMAIL,
//     subject: '** Household Invite **',
//     text: `Come and Join our houshold!`
//   };

//   transporter.sendMail(mailOptions, function(err, data) {
//     if (err) {
//       console.log('error', err);
//     } else {
//       console.log('invite sent!', data);
//     }
//   })
// }

// module.exports = sendMail;