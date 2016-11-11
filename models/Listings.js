var mongoose = require('mongoose');

var Listing = new mongoose.Schema({
  title: String,
  author: String,
  seller: String,
  price: Number
});

mongoose.model('Listing', Listing);
