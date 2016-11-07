var express =require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Listing = require('../models/listings.js');

router.route('/listings').post(function(req, res) {
	var listing = new Listing();
	listing.title = req.body.title;
	listing.author = req.body.author;
	listing.isbn = req.body.isbn;
	listing.cost = req.body.cost;
	listing.stat = req.body.stat;

	listing.save(function(err) {
		if (err) 
			res.send(err);
		 
		res.json({message: 'Created Listing'});
		
	});
});

router.get('/deleteListing', function(req, res, next) {
	res.send('deleting a listing');
});

module.exports = router;
