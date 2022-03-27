const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require("dotenv/config");

// logging
const log = require('./config/logger');

// usage example
// log.error('text error');

// Log Level
// error, warn, info, http, debug

const app = express();
app.use(bodyParser.json());

// user route
const userRoute = require("./routes/user_r");
app.use('/user', userRoute);

// mail route
const mailRoute = require("./routes/mail_r");
app.use('/mail', mailRoute);

// account route
const accountRoute = require("./routes/account_r");
app.use('/account', accountRoute);

// bodyFormat route
const bodyFormatRoute = require("./routes/bodyFormat_r");
app.use('/bodyformat', bodyFormatRoute);

// contact route
const contactRoute = require("./routes/contact_r");
app.use('/contact', contactRoute);

app.use('/', (req, res) => {
  res.send('just index, go to GET /test');
});

app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

app.set('port', process.env.PORT || 3000);

app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  console.log(err);
});

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// DB CONNNECTION
mongoose.connect( process.env.DB_CONNECTION, { useNewUrlParser: true }, () => 
    console.log('mongoose connected!')
);

module.exports = app;

const port = app.get('port');

var server = app.listen(port, function() {
  console.log('Express server listening on port ' + server.address().port);
});

