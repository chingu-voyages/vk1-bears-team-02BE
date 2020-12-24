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
	date_send: { type: Date, default: Date.now },
	date_acknowledge: { type: Date, default: Date.now },
	date_resolved: { type: Date, default: Date.now },
	civilian: [{ type: mongoose.Schema.Types.ObjectId, ref: "Civilians" }],
});

//user
module.exports = mongoose.model("Map", MapSchema);
