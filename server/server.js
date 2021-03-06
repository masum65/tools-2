var pkg = require('../package.json');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, '..', 'app'));
app.set('view options', {
  layout: "_common/views/layout"
});
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /assets
//app.use(favicon(path.join(__dirname,  '..','assets', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(require('node-sass-middleware')({
  src: path.join(__dirname, '..', 'scss'),
  dest: path.join(__dirname, '..', 'assets', 'css'),
  debug: true,
  outputStyle: 'compressed',
  sourceMap: true,
  prefix: "/css",
}));
app.use(express.static(path.join(__dirname, '..', 'assets')));


app.locals.APP = {
  version: pkg.version,
  author: pkg.author,
  repository: pkg.repository,
};

app.locals.TOOLS = require(path.join(__dirname, "configs", "tools.json"));

require(path.join(__dirname, "configs", "routes.json"))
  .forEach(function(router) {
    app.use(router.bind,
      require(
        path.join(__dirname, '..', 'app', router.alias)
      ));
  });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('_common/views/error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('_common/views/error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
