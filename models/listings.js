var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ListingSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  isbn: {
    type: String,
    required: false
  },
  author: {
    type: String,
    required: false
  },
  price: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Listing' , ListingSchema);
