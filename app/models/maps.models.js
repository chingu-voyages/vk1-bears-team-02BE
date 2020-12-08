const mongoose = require("mongoose");

const MapSchema = new mongoose.Schema({
	type: {
		type: String,
		default: "Feature",
	},
	geometry: {
		type: {
			type: String,
			default: "Point",
		},
		coordinates: {
			type: [Number],
		},
	},
	properties: {
		description: {
			type: String,
		},
		title: {
			type: String,
		},
		disasterType: {
			type: String,
		},
	},

	status: {
		type: String,
		default: "sent", //acknowledge // resolve
	},
	civilian: [{ type: mongoose.Schema.Types.ObjectId, ref: "Civilians" }],
});

//user
module.exports = mongoose.model("Map", MapSchema);
