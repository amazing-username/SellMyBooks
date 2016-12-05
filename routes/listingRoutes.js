var express =require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Listing = require('../models/listings.js');

router.route('/listings')

	.post(function(req, res) {

		if (!req.body.title || !req.body.author || !req.body.isbn || !req.body.cost || !req.body.stat || !req.body.class_name || !req.body.major || !req.body.condition || !req.body.notes || !req.body.seller) {
		
			res.json({message : "Error : Missing Field"});

		} else {
	
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
		listing.buyer._id = "";
		listing.username = "";
		listing.buyer.offer = 0;

			listing.save(function(err) {
				if (err) 
					res.send(err);
		 
				res.json({message: 'Created Listing'});
	
			});
		}	

});

router.route('/listings/message')

	.post(function(req, res) {

		Listing.findById(req.body.listing_id, function(err, listing) {
		
			listing.messages.push({contact : req.body.contact_id, message : req.body.message});

			listing.save(function(err) {
				if (err) return handleError(err)
				
				res.json({message : "Sent Message"});
			});
		});
});

router.route('/listings/comment') 
	
	.post(function(req, res) {

		Listing.findById(req.body.listing_id, function(err, listing) {

			listing.comments.push({contact : req.body.contact_id, message : req.body.message});

			listing.save(function(err) {
				if (err) return handleError (err)
			
				res.json({message : "Sent Message"});
			});
		});
});
	

router.route('/listings/buy')

	.post(function(req, res) {

		Listing.findById(req.body.listing_id, function(err, listing) {
		
				
			listing.buyer._id = req.body.buyer_id;
			

			if (req.body.offer) {

				listing.buyer.offer = req.body.offer;
			}

			listing.stat = "pending";
			
			listing.save(function(err) {
				if (err)
					res.send(err);

				res.json({message : "Listing Updated"});
			
			});
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
			if (req.body.class_name) {
				listing.class_name = req.body.class_name;
			}
			if (req.body.major) {
				listing.major = req.body.major;
			}
			if (req.body.condition) {
				listing.condition = req.body.condition;
			} 
			if (req.body.notes) {
				listing.notes = req.body.notes;
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
