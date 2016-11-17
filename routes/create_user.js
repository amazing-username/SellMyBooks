var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/users.js');
var path = require('path');
var user = new User();

router.route('/create_user').post(function(req, res)
{
	user.username = req.body.username;
	user.password = req.body.password;
	user.firstname = req.body.firstname;
	user.lastname = req.body.lastname;
	user.emailaddress = req.body.emailaddress;

	user.save(function(err)
	{
		if (err)
			res.send(err);
		res.json(
		{
			message: "Created a user"
		});
	});	

});

router.route('/create_user/update').post(function(req, res)
{
	User.findById(req.body.users_id, function(err, users)
	{
		if (err)
			res.send(err);
		if (req.body.username)
			user.username = req.body.username;
		if (req.body.password)
			user.password = req.body.password;
		if (req.body.firstname)
			user.firstname = req.body.firstname;
		if (req.body.lastname)
			user.lastname = req.body.lastname;
		if (req.body.emailaddress)
			emailaddress = req.body.address;

		user.save(function(err)
		{
			if (err)
				res.send(err);
			res.json(
			{
				message: "User update"
			});
		});
	});
});
router.route('/create_user/get').get(function(req, res)
{
	User.find(function(err, users)
	{
		if(err)
			res.send(err);
		res.json(users);
	});
});
router.route('/create_user/get:user_id').get(function(req, res)
{
	User.findById(req.params.user_id, function(err, user)
	{
		if (err)
			res.send(err);
		res.json(user);	
	});
});

router.route('/create_user/delete:user_id').delete(function(req, res)
{
	User.remove(
	{
		_id: req.params.user_id
	},
	function(err, user)
	{
		if(err)
			res.send(err);
		res.json(
		{
			message: "Delete user"
		});
	});	
});
		res.json(
		{
			message: 'Created a User'
		});

}	

/* Get to create user page */
router.get('/', function(req, res, next) {
	res.sendFile('create_user.html');
});

module.exports = router; 
