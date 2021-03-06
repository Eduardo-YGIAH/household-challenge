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

app.use(express.static(`${__dirname}/build`));

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

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(`${__dirname}/client/build`));
}

module.exports = app;
