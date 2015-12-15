var path = require('path');
var express = require('express');
var app = express();

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

var server = app.listen(3000, function() {
  console.log("[express] Tools' Server Started...");
});
