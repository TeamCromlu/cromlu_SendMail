var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

app.get('/500', function (req, res){
  res.render('error_500')
});

// app.get('/preview', function (req, res){
//   res.render('tem_mail')
// });

// app.get('/preview_0', function (req, res){
//   res.render('mail_invitacion')
// });

// app.get('/preview_1', function (req, res){
//   res.render('mail_1')
// });

// app.get('/preview_2', function (req, res){
//   res.render('mail_2')
// });


// app.get('/preview_3', function (req, res){
//   res.render('mail_3')
// });

// app.get('/preview_4', function (req, res){
//   res.render('mail_4')
// });

// app.get('/preview_5', function (req, res){
//   res.render('mail_5')
// });

// app.get('/preview_6', function (req, res){
//   res.render('mail_6')
// });


app.get('/send-comprar', function (req, res){
  res.render('send_ok-comprar');
})


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  res.render('error_404');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error_500', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error_500', {
    message: err.message,
    error: {}
  });
});



module.exports = app;
