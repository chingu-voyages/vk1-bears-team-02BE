const mongoose = require("mongoose");
const Users = require("../models/users.model");
const httpsStatus = require("../utilities/httpStatus");

exports.findAll = async (req, res) => {
	try {
		const data = await Users.find().populate("mapData");
		res.status(httpsStatus.OK).json({
			data: data,
			message: "all users(civilian type)",
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
		const data = await Users.findById(req.params.userId).populate("mapData");
		if (!data) {
			return res.status(httpsStatus.NOT_FOUND).json({
				message: "record not found with id: " + req.params.userId,
				status: httpsStatus.NOT_FOUND,
			});
		}
		res.status(httpsStatus.OK).json({
			data: data,
			message: `search result for user: ${req.params.userId}`,
			status: httpsStatus.OK,
		});
	} catch (error) {
		res.status(httpsStatus.INTERNAL_SERVER_ERROR).send({
			message: error.message || "Some error ",
		});
	}
};

///update

///delete
