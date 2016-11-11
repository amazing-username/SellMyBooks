var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Listing = mongoose.model('Listing');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
var listings = mongoose.model('Listing');

router.get('/listings', function(req, res, next) {
  Listing.find(function(err, listings){
    if(err){ return next (err); }
    res.json(listings);
  });
});

router.post('/listings', function(req, res, next) {
  var listing = new Listing(req.body);
  listing.save(function(err,listing){
    if(err){ return next(err); }
    res.json(listing);
  });
});

module.exports = router;
