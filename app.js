const express     = require('express');
const path        = require('path')
const fs          = require('fs');
const favicon     = require('serve-favicon');
const bodyParser  = require('body-parser');

const server      = require('./Modules/Server');
const requestLog  = require('./Modules/RequestLog');
const errorHandler= require('./Modules/ErrorHandler');

const JsonResult  = require('./Class/JsonResult');
const app         = express();

// setup view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app use
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(requestLog);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get("/", index);
app.use(errorHandler.errorNotFound);
app.use(errorHandler.errorHandler);

module.exports = server.createHTTP(app);


// functions
function index(req, res, next) {
  var contentType = req.headers['content-type'];

  if (contentType == 'application/json') {

    var jsonResult = JsonResult.success();
    var resultData = {"test": "testdata"}
    res.json(jsonResult.json(resultData));
  } else {

    let renderView = req.path
    renderView = renderView.replace("/", "")
    res.render(renderView, {
      title: "test page"
    });
  }
}
