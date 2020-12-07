const bcrypt = require("bcrypt");
const saltRounds = 10;
const mongoose = require("mongoose");
const Admins = require("../models/admins.models");

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
			res
				.status(200)
				.json({ data: data, message: "admin has been admin", status: 200 });
		} catch (error) {
			res.status(500).json({
				message:
					error.message || "Some error occurred while creating customer data.",
			});
		}
	});
};

exports.findAll = async (req, res) => {
	try {
		const data = await Admins.find();
		res.status(200).json({ data: data, message: "all users(admin type)" });
	} catch (error) {
		res.status(500).json({
			message:
				error.message || "Some error occurred while creating customer data.",
		});
	}
};

exports.findOne = async (req, res) => {
	try {
		const data = await Admins.findById(req.params.userId);
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
exports.update = async (req, res) => {
	const { username, password, email, givenName, familyName } = req.body;
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
			const data = await Admins.findByIdAndUpdate(
				req.params.userId,
				reqBody,
				option
			);

			if (!data) {
				return res.status(404).send({
					message: "record not found with id " + req.params.userId,
				});
			} else {
				return res.status(200).send({
					message: "record updated for user id " + req.params.userId,
				});
			}
		} catch (error) {
			res.status(500).send({
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
			return res.status(404).send({
				message: "record not found with id " + req.params.userId,
			});
		} else {
			return res.status(200).send({
				message: "record deleted for user id " + req.params.userId,
			});
		}
	} catch (err) {
		if (err.kind === "ObjectId" || err.name === "NotFound") {
			return res.status(404).send({
				message: "User not found with id " + req.params.userId,
			});
		}
		return res.status(500).send({
			message: "Could not delete user with id " + req.params.userId,
		});
	}
};
