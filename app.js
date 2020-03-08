require('dotenv').config();
var express = require('express');
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
var usersRouter = require('./routes/users');
app.use('/users/api', usersRouter);

module.exports = app;
