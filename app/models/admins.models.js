const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
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
		required: true,
	},

	givenName: {
		type: String,
	},

	familyName: {
		type: String,
	},
});

//user
module.exports = mongoose.model("Admins", AdminSchema);
