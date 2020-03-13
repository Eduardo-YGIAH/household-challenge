const sendMail = require('../config/mail');


exports.send_invitation = async (req, res) => {
  //send mail here
  try {
    console.log('Date: ', req.body);
    const { email } = req.body;
    const subject = req.body.name;
    const text = req.body.message;

    console.log(email, subject, text);

    sendMail(email, subject, text, function(err, data) {
      if (err) {
        console.log('ERROR: ', err);
        return res.status(500).json({ message: err.message || 'Internal Error' });
      }
      console.log('Email sent');
      return res.json({ message: 'Invite successfully sent!' });
    });

  } catch (error) {
    res.status(500).send(error)
  }
};