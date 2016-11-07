var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ListingSchema = new Schema({
	title : String,
	author : String,
	isbn : String,
	cost : {
		type: Number,
		required: true
	},
	stat : String,
	data_created : {
		type: Date,
		default: Date.now
	}	
});

module.exports = mongoose.model('Listing' , ListingSchema);
