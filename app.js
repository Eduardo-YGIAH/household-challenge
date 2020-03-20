require('dotenv').config();
const express = require('express');
const fileupload = require('express-fileupload');
// var path = require('path');
const connection = require('./config/db/dbConnection');

const app = express();

app.use(
  fileupload({
    useTempFiles: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(`${__dirname}/dist`));
// app.use(express.static(path.join(__dirname, 'public')));

const forceSSL = function() {
  return function(req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(['https://', req.get('Host'), req.url].join(''));
    }
    next();
  };
};

// For all GET requests, send back index.html so that PathLocationStrategy can be used
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});

// Instruct the app to use the forceSSL middleware
app.use(forceSSL());

connection.once('open', () => {
  console.log('MoongDB database connection established successfully.');
});

// routes
const usersRouter = require('./routes/users');
const householdRouter = require('./routes/household');
const challengeRouter = require('./routes/challenge');
const taskRouter = require('./routes/task');
const inviteRouter = require('./routes/invite');

app.use('/api', usersRouter);
app.use('/api', householdRouter);
app.use('/api', challengeRouter);
app.use('/api', taskRouter);
app.use('/api', inviteRouter);

module.exports = app;
