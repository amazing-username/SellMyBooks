
/*
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/users.js');
var path = require('path');


router.route('/create_user').post(function(req, res)
{
	var user = new User();
	user.username = req.body.username;
	user.password = req.body.password;
	user.firstname = req.body.firstname;
	user.lastname = req.body.lastname;
	user.emailaddress = req.body.emailaddress;



	user.save(function(err)
	{
		res.json(
		{
			message: 'Created a User'
		});

});

/* Get to create user page */

/*
router.get('/', function(req, res, next) {
	res.sendFile('create_user.html');
});

module.exports = router;
*/

var express = require('express');
var router = express.Router();
var path = require('path');

/* Get to create user page */
router.get('/', function(req, res, next) {
	res.sendFile('create_user.html');
});

module.exports = router; 
