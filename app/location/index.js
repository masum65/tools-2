var request = require('request');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  var _ip = (req.ip != "::1" && req.ip != "127.0.0.1") ? req.ip : "";
  request("http://freegeoip.net/json/" + _ip, function(err, response, data) {
    if (err) throw err;
    res.send(data);
  });
});

module.exports = router;
