var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('Application', { title: 'Search Results for Application' });
});

module.exports = router;