require('dotenv').config()

var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var cors = require('cors')
var logger = require('morgan');
var mongoose = require('mongoose')

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());





const dburl = "mongodb+srv://dbuser:" + process.env.DB_KEY + "@cluster0.wlcf1.mongodb.net/database?retryWrites=true&w=majority"

// database connection
mongoose.connect(dburl, {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connection.on('error', console.error.bind(console, 'connection error:'));


// import routes
const auth = require('./routes/auth')
const api = require('./routes/api')

// middleware
const tokenmiddleware = require('./middleware/token-middleware')


// routes
app.use('/auth', auth)
app.use('/api', tokenmiddleware, api)






/******************************/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
