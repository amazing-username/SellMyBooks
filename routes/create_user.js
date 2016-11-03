var express = require('express');
var router = express.Router();
var path = require('path');

/* Get to create user page */
router.get('/', function(req, res, next) {
	res.sendFile('create_user.html');
});

module.exports = router; 
