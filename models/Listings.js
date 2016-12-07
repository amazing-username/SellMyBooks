var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var docMessages = new Schema({
	listing_id : String,
	contact : String,
	message : String
});

var ListingSchema = new Schema({
	title : String,

	author : String,

	isbn : String,

	cost : Number,

	stat : String,

	data_created : {
		type: Date,
		default: Date.now
	},

	class_name : String,

	major : String,

	condition : String,

	notes : String,

	seller : String,

	buyer : {
		_id : String,
		username : String,
		offer : Number
	},
	messages : [docMessages],

	comments : [docMessages]
});

module.exports = mongoose.model('Listing' , ListingSchema);
