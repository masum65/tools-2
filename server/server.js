var express = require('express');
var app = express();

app.use('./assets', express.static(__dirname + './public/assets'));
app.use('./assets', function(req, res, next) {
  res.send(404);
});

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

app.all('/*', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

var server = app.listen(3001, function() {
  console.log("[express] Server Started...");
});
