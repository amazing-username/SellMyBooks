var express =require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Listing = require('../models/listings.js');

router.route('/listings')

	.post(function(req, res) {


		var listing = new Listing();
		listing.title = req.body.title;
		listing.author = req.body.author;
		listing.isbn = req.body.isbn;
		listing.cost = req.body.cost;
		listing.stat = req.body.stat;
		listing.class_name = req.body.class_name;
		listing.major = req.body.major;
		listing.condition = req.body.condition;
		listing.notes = req.body.notes;
		listing.seller = req.body.seller;

		if (req.body.title && req.body.author && req.body.cost && req.body.stat && req.body.seller) {

			listing.save(function(err) {
				if (err)
					res.send(err);

				res.json({message: 'Created Listing'});

			});

		} else {

			res.json({message: 'Error 1 : Missing Required Fields'});

		}

});

router.route('/listings/update')

	.post(function(req, res) {

		Listing.findById(req.body.listing_id, function(err, listing) {

			if (err)
				res.send(err);

			if (req.body.title) {
				listing.title = req.body.title;
			}
			if (req.body.author) {
				listing.author = req.body.author;
			}
			if (req.body.isbn) {
				listing.isbn = req.body.isbn;
			}
			if (req.body.cost) {
				listing.cost = req.body.cost;
			}
			if (req.body.stat) {
				listing.stat = req.body.stat;
			}

			listing.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: "Listing Updated"});
			});
		});
});
router.route('/listings/get/foruser')

.post(function(req, res) {
	var query = {}
	if (req.body.seller) {
		query.seller = req.body.seller;
	}

	Listing.find(query, function (err, listings) {
		if (err)
		{
			res.send(err);
		}
		res.json(listings);
	});
	});



router.route('/listings/get')

	.get(function(req, res) {
		Listing.find(function(err, listings) {
			if (err)
				res.send(err);

			res.json(listings);
		});
});
router.route('/listings/get/search')

	.post(function(req, res) {
		var query = {}
		if (req.body.title) {
			query.title = req.body.title;
			console.log("title: " + query.title);
		}
		if (req.body.author) {
			query.author = req.body.author;
			console.log("author: " + query.author);

		}
		if (req.body.isbn) {
			query.isbn = req.body.isbn;
			console.log("isbn: " + query.isbn);

		}
		if (req.body.cost) {
			if (req.body.cost>0)
			{
				query.cost = {"$lte" : req.body.cost};
				console.log("cost: " + query.cost);
			}
		}

		if (req.body.seller){

			query.seller = {"$ne" : req.body.seller};
		}
		if (req.body.stat){
			query.stat = {"$ne" : "sold"};
		}
		Listing.find(query, function (err, listings) {
			if (err)
			{
				res.send(err);
			}
			res.json(listings);
		});

});

router.route('/listings/get')

	.get(function(req, res) {
		Listing.find(function(err, listings) {
			if (err)
				res.send(err);

			res.json(listings);
		});
});

router.route('/listings/get/:listing_id')

	.get(function(req, res) {
		Listing.findById(req.params.listing_id, function(err, listing) {
			if (err)
			{
				res.send(err);
			}
			else{
			res.json(listing);
		}
		});
});

router.route('/listings/delete/:listing_id')

	.delete(function(req, res) {
		Listing.remove({
			_id: req.params.listing_id
		}, function(err, listing) {
			if (err)
				res.send(err);

			res.json({ message : 'Successfully Deleted'});

		});
});

module.exports = router;
