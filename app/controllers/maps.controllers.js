const mongoose = require("mongoose");
const Maps = require("../models/maps.models");
const httpsStatus = require("../utilities/httpStatus");

const Pusher = require("pusher");

const pusher = new Pusher({
	appId: process.env.APP_ID,
	key: process.env.APP_KEY,
	secret: process.env.APP_SECRET,
	cluster: "us3",
	useTLS: true,
});

exports.create = async (req, res) => {
	const {
		civilian,
		longitude,
		latitude,
		description,
		title,
		disasterType,
	} = req.body;

	const mapData = new Maps({
		civilian: civilian,
		geometry: { coordinates: [longitude, latitude] },
		properties: {
			description: description,
			title: title,
			disasterType: disasterType,
		},
	});

	try {
		const data = await mapData.save();

		pusher.trigger("map-data-create", "map-data-create-event", {
			feature: data,
		});

		res.status(httpsStatus.OK).json({
			feature: data,
			message: "distress message has been sent",
			status: httpsStatus.OK,
		});
	} catch (error) {
		res.status(httpsStatus.INTERNAL_SERVER_ERROR).json({
			message: error.message || "Some error occurred while creating user data.",
		});
	}
};

exports.findAll = async (req, res) => {
	try {
		const features = await Maps.find().populate("civilian");
		pusher.trigger("map-data-findAll", "map-data-findAll-event", {
			feature: features,
		});
		res.status(httpsStatus.OK).json({
			features: features,
			message: "all map data",
			status: httpsStatus.OK,
		});
	} catch (error) {
		res.status(httpsStatus.INTERNAL_SERVER_ERROR).json({
			message:
				error.message || "Some error occurred while creating customer data.",
		});
	}
};

exports.findOne = async (req, res) => {
	try {
		const data = await Maps.findById(req.params.mapId);
		if (!data) {
			return res.status(httpsStatus.NOT_FOUND).json({
				message: "record not found with id: " + req.params.mapId,
			});
		}
		res.status(httpsStatus.OK).json({
			data: data,
			message: `search result for : ${req.params.mapId}`,
			status: httpsStatus.OK,
		});
	} catch (error) {
		res.status(httpsStatus.INTERNAL_SERVER_ERROR).send({
			message: error.message || "Some error ",
		});
	}
};

exports.update = async (req, res) => {
	const { status } = req.body;

	const reqBody = {
		status: status,
	};
	const option = { new: true };

	try {
		const data = await Maps.findByIdAndUpdate(
			req.params.mapId,
			reqBody,
			option
		);

		if (!data) {
			return res.status(httpsStatus.NOT_FOUND).send({
				message: "record not found with id " + req.params.mapId,
				status: httpsStatus.NOT_FOUND,
			});
		}

		pusher.trigger("map-data-update", "map-data-update-event", {
			data: data,
		});
		return res.status(httpsStatus.OK).send({
			data: data,
			message: "record updated for data with an id of " + req.params.mapId,
			status: httpsStatus.OK,
		});
	} catch (error) {
		res.status(httpsStatus.INTERNAL_SERVER_ERROR).send({
			message: error.message || "Some error ",
		});
	}
};

///delete

exports.delete = async (req, res) => {
	try {
		const data = await Maps.findByIdAndRemove(req.params.mapId);
		if (!data) {
			return res.status(httpsStatus.NOT_FOUND).send({
				message: "record not found with id " + req.params.mapId,
				status: httpsStatus.NOT_FOUND,
			});
		} else {
			return res.status(httpsStatus.OK).send({
				message: "record deleted " + req.params.mapId,
				status: httpsStatus.OK,
			});
		}
	} catch (err) {
		if (err.kind === "ObjectId" || err.name === "NotFound") {
			return res.status(httpsStatus.NOT_FOUND).send({
				message: "data not found with id " + req.params.mapId,
			});
		}
		return res.status(httpsStatus.INTERNAL_SERVER_ERROR).send({
			message: "Could not delete data with id " + req.params.mapId,
		});
	}
};
