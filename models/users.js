var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UsersSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
  firstname: {
    type: String,
    required: true
  }	  
  lastname: {
    type: String,
    required: true
  }	  
  emailaddress: {
    type: String,
    required: true
    unique: true;	  
  }	  
	
});

module.exports = mongoose.model('Users' ,UsersSchema);
