// var createError = require('http-errors');
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

// var app = express();

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// module.exports = app;

require('./config/config');

var express = require('express');
const _ = require('lodash');
var {ObjectID} = require('mongodb');
var {mongoose} = require('./db/mongoose');


//----if any problem then change it
process.on('SIGTERM', async function () {
  console.error('SIGTERM called');
  await mongoose.disconnect();
  console.error('Mongoose connection terminated');
  process.exit(0);
});

// -----------------------------------

const port = process.env.PORT;

// dummy depedencies
let createError = require('http-errors');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let cors = require('cors');




// routes files
const nttnRouter = require("./routes/nttn");
const ispRouter = require('./routes/isp');
const userRouter = require('./routes/user');
const packageRouter = require('./routes/package');
const pendingRouter = require('./routes/pending');
const notificationRouter = require('./routes/notification');
const paymentRouter = require('./routes/payment');
const offerRouter = require('./routes/offer');

// send json to express application

var app = express();

// // view engine setup
//app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//dummy dependencies
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());


//API ROUTES

app.use("/api/nttn", nttnRouter);
app.use("/api/isp", ispRouter);
app.use("/api/user", userRouter);
app.use("/api/package",packageRouter);
app.use("/api/pending", pendingRouter);
app.use("/api/notification",notificationRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/offer",offerRouter);

//dummy function

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









