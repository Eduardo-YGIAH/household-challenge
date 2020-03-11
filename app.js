require('dotenv').config();
const express = require('express');
// var path = require('path');
const connection = require('./config/db/dbConnection');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use(express.static(path.join(__dirname, 'public')));

connection.once('open', () => {
  console.log('MoongDB database connection established successfully.');
});

// routes
const usersRouter = require('./routes/users');
const householdRouter = require('./routes/household');
const challengeRouter = require('./routes/challenge');
const taskRouter = require('./routes/task');

app.use('/api', usersRouter);
app.use('/api', householdRouter);
app.use('/api', challengeRouter);
app.use('/api', taskRouter);

module.exports = app;
