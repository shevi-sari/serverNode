// var createError = require('http-errors');
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');
// var cors = require('cors')
// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/usersRouter');
// var email = require('./sendEmail')
// var app = express();


// const mogoose = require('mongoose');
// //dotenv.config();

// const connectionParams = {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useUnifiedTopology: true,
// }
// const dbc = "mongodb+srv://shevi_frankel:323114538@cluster0.q4hii.mongodb.net/sekerGraphDB?retryWrites=true&w=majority";
// mogoose.connect(
//   dbc, connectionParams).then(() => {
//     console.log('connected DB')
//   }).catch((err) => console.log(err));


// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(cors());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });


// var nodemailer = require('nodemailer');

// var transporter = nodemailer.createTransport({
//   service: 'gmail',
//   host: 'smtp.gmail.com',
//   port: 587,
//   secure: false,
//   requireTLS: true,
//   auth: {
//     user: ' בת-שבע פרנקל',
//     pass: '323114538'
//   }
// }):

// var mailOptions = {
//   from: '3340sf@gmail.com',
//   to: '3340sf@gmail.com',
//   subject: 'Sending Email using Node.js',
//   text: 'That was easy!'
// };

// transporter.sendMail(mailOptions, function (error, info) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// });





// app.listen(3000)


// module.exports = app;


var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/usersRouter');
//var email = require('./sendEmail')
var app = express();


const mongoose = require('mongoose');
//dotenv.config();

const connectionParams = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
}
 const url = "mongodb+srv://shevi_frankel:323114538@cluster0.q4hii.mongodb.net/sekerGraphDB?retryWrites=true&w=majority";
// mongoose.connect(
//   dbc, connectionParams).then(() => {
//     console.log('connected DB')
//   }).catch((err) => console.log(err));



//const url = "mongodb://localhost:27017/sekerGraphDB";
mongoose.connect(url, connectionParams).then(() => {
  console.log("DB Connected with mongoose!")
}).catch((err) => console.log(err));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
//app.use('/users', usersRouter);
//email
//app.use('/sendEmail', email);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


// var nodemailer = require('nodemailer');

// var transporter = nodemailer.createTransport({
//   service: 'gmail',
//   host: 'smtp.gmail.com',
//   port: 587,
//   secure: false,
//   requireTLS: true,
//   auth: {
//     user: ' בת-שבע פרנקל',
//     pass: '323114538'
//   }
// });

// var mailOptions = {
//   from: '3340sf@gmail.com',
//   to: '3340sf@gmail.com',
//   subject: 'Sending Email using Node.js',
//   text: 'That was easy!'
// };

// transporter.sendMail(mailOptions, function (error, info) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// });





app.listen(3012,()=>{
console.log('listen at port 3012')});

module.exports = app;
















