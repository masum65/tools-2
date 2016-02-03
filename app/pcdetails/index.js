var request = require('request');
var fs = require('fs');
var express = require('express');
var path = require('path');
var router = express.Router();

router.get('/', function(req, res, next) {

  var _ua = req.query.ua || req.headers['user-agent'];
  var ua = require('useragent').parse(_ua);

  res.locals.tool = req.app.locals.TOOLS.pcdetails;

  res.locals.system = {
    browser: {
      family: ua.family,
      major: ua.major,
      minor: ua.minor,
      patch: ua.patch,
    },
    device: ua.device,
    os: ua.os,
  };

  res.render('pcdetails/view', {
    title: ' - PCDetails',
    script: fs.readFileSync(path.join(__dirname, "script.js"), "utf8"),
  });

});

module.exports = router;
