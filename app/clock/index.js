var fs = require('fs');
var express = require('express');
var path = require('path');
var router = express.Router();

router.get('/', function(req, res, next) {

  res.locals.tool = req.app.locals.TOOLS.clock;

  res.render('clock/view', {
    title: ' - Clock',
    script: fs.readFileSync(path.join(__dirname, "script.js"), "utf8"),
  });

});

module.exports = router;
