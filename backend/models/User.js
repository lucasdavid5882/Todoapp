const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
	name:{
		type:String,
		required:true
	},
	email:{
		type:String,
		required:true,
		lowercase:true
	},
	password:{
		type:String,
		required:true
	},
	date:{
		type:Date,
		default:Date()
	}
	// items:[type:Schema.Types.ObjectId,ref:'Item']
});

mongoose.model('user',User);

// module.exports = User;