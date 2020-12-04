const mongoose = require("mongoose");
const Users = require("../models/users.model");

exports.findAll = async (req, res) => {
	try {
		const data = await Users.find();
		res.status(200).json({ data: data, message: "all users(civilian type)" });
	} catch (error) {
		res.status(500).json({
			message:
				error.message || "Some error occurred while creating customer data.",
		});
	}
};

exports.findOne = async (req, res) => {
	try {
		const data = await Users.findById(req.params.userId);
		if (!data) {
			return res.status(404).json({
				message: "record not found with id: " + req.params.userId,
			});
		}
		res.status(200).json({
			data: data,
			message: `search result for user: ${req.params.userId}`,
		});
	} catch (error) {
		res.status(500).send({
			message: error.message || "Some error ",
		});
	}
};

///update

///delete
