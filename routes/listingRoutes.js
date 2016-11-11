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

		listing.save(function(err) {
			if (err)
				res.send(err);

			res.json({message: 'Created Listing'});

		});
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
				res.send(err);
			res.json(listing);
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
