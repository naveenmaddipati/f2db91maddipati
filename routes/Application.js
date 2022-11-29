var express = require('express');
const Application_controlers= require('../controllers/Application');
var router = express.Router();
// A little function to check if we have an authorized user and continue on 

// redirect to login. 
const secured = (req, res, next) => { 
    if (req.user){ 
      return next(); 
    } 
    req.session.returnTo = req.originalUrl; 
    res.redirect("/login"); 
  } 
// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('Application', {title:'Search Results Application'});
// });
/* GET detail Application page */ 
router.get('/detail',secured, Application_controlers.Application_view_one_Page);
/* GET Application */ 
router.get('/', Application_controlers.Application_view_all_Page );
/* GET create Application page */ 
router.get('/create', secured, Application_controlers.Application_create_Page); 
/* GET create update page */ 
router.get('/update',secured, Application_controlers.Application_update_Page); 
/* GET delete costume page */ 
router.get('/delete', secured, Application_controlers.Application_delete_Page); 
// GET request for one Application. 
router.get('/Application/:id', Application_controlers.Application_detail); 
module.exports = router;

 
