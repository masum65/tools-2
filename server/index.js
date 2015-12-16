var path = require('path');
var express = require('express');
var app = express();
var mode = process.env.NODE_ENV;

app.get('/api/ua', function(req, res, next) {
  var _ua = req.query.ua || req.headers['user-agent'];
  var ua = require('useragent').parse(_ua);
  res.send(JSON.stringify({
    browser: {
      family: ua.family,
      major: ua.major,
      minor: ua.minor,
      patch: ua.patch,
    },
    device: ua.device,
    os: ua.os,
  }));
});

if (mode != "production") {
  app.use(express.static(path.resolve(__dirname + '/../public/')));
  app.all('/*', function(req, res) {
    res.sendFile(path.resolve(__dirname + '/../public/index.html'));
  });
}

var server = app.listen(3000, function() {
  console.log("[express] Tools' Server Started...");
});
