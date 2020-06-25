const express     = require('express');
const http        = require('http');
const https       = require('https');
const morgan      = require('morgan');
const chalk       = require('chalk');
const path        = require('path')
const fs          = require('fs');
const favicon     = require('serve-favicon');
const bodyParser  = require('body-parser');
const JsonResult  = require('./Class/JsonResult');
const app         = express();
const options     = {
  key:  fs.readFileSync('./keys/private.pem'),
  cert: fs.readFileSync('./keys/public.pem')
};

// setup morgan
morgan.token('logDate', function (req, res) { return new Date(); });
morgan.token('body', function (req, res) { return JSON.stringify(req.body); });

// setup view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app use
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan(setupMorgan));
app.get("/", index);
app.use(errorNotFound);
app.use(errorHandler);

// function
function setupMorgan(tokens, req, res) {
  if (res.statusCode != 200) return;

  return [
    chalk['bgGreen']('[' + tokens.logDate(req, res) + ']'),
    chalk['blue'].bold(tokens.body(req, res))
  ].join(' ');
}

function index(req, res, next) {
  var contentType = req.headers['content-type'];

  if (contentType == 'application/json') {

    var jsonResult = new JsonResult(0, "success");
    res.json(jsonResult.json());
  } else {

    let renderView = req.path
    renderView = renderView.replace("/", "")
    res.render(renderView);
  }
}

function errorNotFound(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404
  next(err);
}

function errorHandler(err, req, res, next) {
  var contentType = req.headers['content-type'];

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  if (contentType == 'application/json') {

    var jsonResult = new JsonResult(err.status, err.message);
    res.json(jsonResult);
  } else {

    res.render('error');
  }
}

// server http / https
function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

var port      = normalizePort(process.env.PORT || '13000');
var httpsPort = 443;

http.createServer(app).listen(port, function() {
  console.log("HTTP server listening on port " + port);
});

https.createServer(options, app).listen(httpsPort, function() {
  console.log("HTTPS server listening on port " + httpsPort);
});
