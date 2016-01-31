var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('tos/view', {
    title: ' - Terms of Service'
  });
});

module.exports = router;
