var path = require('path');
var express = require('express');
var app = express();

app.use("/css", express.static(path.resolve(__dirname + '/../public/css')));
app.use("/scripts", express.static(path.resolve(__dirname + '/../public/scripts')));
app.use("/views", express.static(path.resolve(__dirname + '/../public/views')));
app.use("/config.js", express.static(path.resolve(__dirname + '/../public/config.js')));

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
  res.sendFile(path.resolve(__dirname + '/../public/index.html'));
});

var server = app.listen(3000, function() {
  console.log("[express] Server Started...");
});
