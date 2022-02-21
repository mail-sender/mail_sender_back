var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
const bodyParser = require('body-parser');

require("dotenv/config");

const app = express();
app.use(bodyParser.json());

//route
const userRoute = require("./routes/user_r");
app.use('/user', userRoute);
app.use('/', (req, res) => {
    res.send('just index, go to GET /user');
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

