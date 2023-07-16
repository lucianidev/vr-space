var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

var indexRouter = require('./routes/payments');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(cors({
    origin : 'http://127.0.0.1:5173'
}));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use('/payments', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
