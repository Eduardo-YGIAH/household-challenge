require('dotenv').config();
const mail = require('../config/mail');

exports.send_invite = (req, res, next) => {
  console.log(req.body)
  const { email, name } = req.body;
  mail(email, name, function(err, data) {
    if(err) {
      console.log(error);
      res.status(500).json({ message: 'Internal Error' })
    } else {
      res.json({ message: 'Message recieved!!!' })
    }
  });
}
