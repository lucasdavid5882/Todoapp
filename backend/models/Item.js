const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Item = new Schema({
	title:{
		type:String,
		required:true
	},
	description:{
		type:String,
		required:true
	},
	date:{
		type:Date,
		default:Date.now()
	},
	tags:{
		type:String,
		required:false
	},
	user:{
		type:String,
		required:true
	}
})

mongoose.model("item",Item);