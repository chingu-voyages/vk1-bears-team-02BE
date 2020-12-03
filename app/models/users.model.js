const mongoose = require("mongoose");

const passportLocalMongoose = require("passport-local-mongoose");

mongoose.set("useCreateIndex", true);

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		// required: true,
	},
});

//for hashing and salting password
UserSchema.plugin(passportLocalMongoose);

//user
module.exports = mongoose.model("Civilians", UserSchema);
