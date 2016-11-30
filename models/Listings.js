var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ListingSchema = new Schema({
	title : String,
	author : String,
	isbn : String,
	cost : {type: Number},
	stat : String,
buyers: String,
	data_created : {
		type: Date,
		default: Date.now
	}	,
	class_name : {
		type : String
	},
	major : {
		type : String
	},
	condition : {
		type : String
	},
	notes : {
		type : String
	},
	seller : {
		type : String
	}
});

module.exports = mongoose.model('Listing' , ListingSchema);
