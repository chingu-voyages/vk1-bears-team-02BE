const bcrypt = require("bcrypt");
const saltRounds = 10;
const mongoose = require("mongoose");
const Admins = require("../models/admins.models");
const httpsStatus = require("../utilities/httpStatus");

exports.create = async (req, res) => {
	const { username, password, email, givenName, familyName } = req.body;

	bcrypt.hash(password, saltRounds, async (err, hash) => {
		const admin = new Admins({
			username: username,
			password: hash,
			email: email,
			givenName: givenName,
			familyName: familyName,
		});
		try {
			const data = await admin.save();
			res.status(httpsStatus.CREATED).json({
				data: data,
				message: "admin has been admin",
				status: httpsStatus.CREATED,
			});
		} catch (error) {
			res.status(httpsStatus.INTERNAL_SERVER_ERROR).json({
				message:
					error.message || "Some error occurred while creating user data.",
			});
		}
	});
};

exports.findAll = async (req, res) => {
	try {
		const data = await Admins.find();
		res.status(httpsStatus.OK).json({
			data: data,
			message: "all users(admin type)",
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
		const data = await Admins.findById(req.params.userId);
		if (!data) {
			return res.status(httpsStatus.NOT_FOUND).json({
				message: "record not found with id: " + req.params.userId,
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
exports.update = async (req, res) => {
	const { username, password, email, givenName, familyName, userId } = req.body;
	const option = { new: true };

	bcrypt.hash(password, saltRounds, async (err, hash) => {
		const reqBody = {
			username: username,
			password: hash,
			email: email,
			givenName: givenName,
			familyName: familyName,
		};

		try {
			const data = await Admins.findByIdAndUpdate(userId, reqBody, option);

			if (!data) {
				return res.status(httpsStatus.NOT_FOUND).send({
					message: "record not found with id " + req.params.userId,
					status: httpsStatus.NOT_FOUND,
				});
			}
			return res.status(httpsStatus.CREATED).send({
				message: "record updated for user id " + req.params.userId,
				status: httpsStatus.CREATED,
			});
		} catch (error) {
			res.status(httpsStatus.INTERNAL_SERVER_ERROR).send({
				message: error.message || "Some error ",
			});
		}
	});
};

///delete

exports.delete = async (req, res) => {
	try {
		const data = await Admins.findByIdAndRemove(req.params.userId);
		if (!data) {
			return res.status(httpsStatus.NOT_FOUND).send({
				message: "record not found with id " + req.params.userId,
				status: httpsStatus.NOT_FOUND,
			});
		} else {
			return res.status(httpsStatus.OK).send({
				message: "record deleted for user id " + req.params.userId,
				status: httpsStatus.OK,
			});
		}
	} catch (err) {
		if (err.kind === "ObjectId" || err.name === "NotFound") {
			return res.status(httpsStatus.NOT_FOUND).send({
				message: "User not found with id " + req.params.userId,
			});
		}
		return res.status(httpsStatus.INTERNAL_SERVER_ERROR).send({
			message: "Could not delete user with id " + req.params.userId,
		});
	}
};
