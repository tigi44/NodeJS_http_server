const JsonResult = require('../Class/JsonResult');

module.exports = {
  errorNotFound: function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404
    next(err);
  },
  errorHandler: function (err, req, res, next) {
    var contentType = req.headers['content-type'];

    err.status = err.status || 500;
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status);

    if (contentType == 'application/json') {

      var jsonResult = new JsonResult(err.status, err.message);
      res.json(jsonResult);
    } else {

      res.render('error');
    }
  }
}
