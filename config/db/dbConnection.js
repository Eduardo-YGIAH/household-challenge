require('dotenv').config();
var mongoose = require('mongoose');

const CONNECTION_URI = process.env.MONGODB_URI;

mongoose.connect(
  CONNECTION_URI,
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  function(err) {
    if (err) console.log(err);
  },
);

const connection = mongoose.connection;

module.exports = connection;
