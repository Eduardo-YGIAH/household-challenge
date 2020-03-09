require('dotenv').config();
const express = require('express');
// var path = require('path');
const connection = require('./config/db/dbConnection');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use(express.static(path.join(__dirname, 'public')));

connection.once('open', () => {
  console.log('MoongDB database connection established successfully.');
});

// routes
const usersRouter = require('./routes/users');
const householdRouter = require('./routes/household');
app.use('/api', usersRouter);
app.use('/api', householdRouter);

module.exports = app;
