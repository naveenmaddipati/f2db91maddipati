var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport'); 
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy( 
  function(username, password, done) { 
    Account.findOne({ username: username }, function (err, user) { 
      if (err) { return done(err); } 
      if (!user) { 
        return done(null, false, { message: 'Incorrect username.' }); 
      } 
      if (!user.validPassword(password)) { 
        return done(null, false, { message: 'Incorrect password.' }); 
      } 
      return done(null, user); 
    }); 
  } 
)); 

require('dotenv').config();
const connectionString =
  process.env.MONGO_CON
mongoose = require('mongoose');
mongoose.connect(connectionString,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var ApplicationRouter = require('./routes/Application');
var gridbuildRouter = require('./routes/gridbuild');
var selectorRouter = require('./routes/selector');
var resourceRouter = require("./routes/resource");
var Application = require("./models/Application");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({ 
  secret: 'keyboard cat', 
  resave: false, 
  saveUninitialized: false 
})); 
app.use(passport.initialize()); 
app.use(passport.session()); 


app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/Applications', ApplicationRouter);
app.use('/gridbuild', gridbuildRouter);
app.use('/selector', selectorRouter);
app.use('/resource', resourceRouter);


async function recreateDB() {
  // Delete everything
  await Application.deleteMany();
  let instance1 = new
    Application({"App_Name": "WhatsApp", 
    "App_Company": "META", "App_Size": 150.8, 
    "App_Rating": 4.7,"App_Category":"Communication"
  });  
  let instance2 = new
    Application({"App_Name": "LinkedIn", 
    "App_Company": "LinkedIn Corporation", 
    "App_Size": 301.6, "App_Rating": 4.2,
    "App_Category":"Social"
  });
  let instance3 = new
    Application({"App_Name": "Canvas Student", 
    "App_Company": "Instructure Inc.", 
    "App_Size": 113.1, "App_Rating": 4.7,
    "App_Category":"Education"
  });
  let instance4 = new
    Application({"App_Name": "Zoom", 
    "App_Company": "Zoom Video Communications, Inc.", 
    "App_Size": 159.2, "App_Rating": 4.6,
    "App_Category":"Business"
  });
  instance1.save(function (err, doc) {
    if (err) return console.error(err);
    console.log("First Application saved")
  });
  instance2.save(function (err, doc) {
    if (err) return console.error(err);
    console.log("Second Application saved")
  });
  instance3.save(function (err, doc) {
    if (err) return console.error(err);
    console.log("Fourth Application saved")
  });
  instance4.save(function (err, doc) {
    if (err) return console.error(err);
    console.log("Third Application saved")
  });
}
let reseed = true;
if (reseed) { recreateDB(); }

// passport config 
// Use the existing connection 
// The Account model  
var Account =require('./models/account'); 
 
passport.use(new LocalStrategy(Account.authenticate())); 
passport.serializeUser(Account.serializeUser()); 
passport.deserializeUser(Account.deserializeUser()); 

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

module.exports = app;