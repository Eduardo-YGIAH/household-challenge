const { sendMail } = require('../config/mail');


// import express and sendMail function
/*-------------------------------------*/
exports.send_invitation = async (req, res, next) => {
  try{
    await sendMail(
      req.body.email,
      'no-reply@test.com',
      '** Household Invite **',
      req.body.message
    );
    res.send('email sent! :)');
  } catch(error){
    console.log(error);
    res.status(500);
  }
};