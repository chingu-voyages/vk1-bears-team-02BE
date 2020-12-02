const bcrypt = require("bcrypt");
const saltRounds = 10;
const User = require("../models/users.model");

exports.register = async (req, res) => {
	const { username, email, password } = req.body;

	bcrypt.hash(password, saltRounds, async (err, hash) => {
		// Store hash in your password DB.

		const user = new User({
			username: username,
			email: email,
			password: hash,
		});

		try {
			const data = await user.save();
			res.json({ data: data, status: 200 });
		} catch (error) {
			res.send(error);
		}
	});
};

exports.login = async (req, res) => {
	const { username, password } = req.body;

	try {
		const data = await User.findOne(
			{ username: username },
			(error, foundUser) => {
				if (error) {
					console.log(`error:${error}`);
				} else {
					if (foundUser) {
						// if (foundUser.password === password) {
						// 	res.json({ data: data, status: 200 });
						// } else {
						// 	res.json({ data: "error,wrong password" });
						// }

						bcrypt.compare(
							password,
							foundUser.password,
							async (err, result) => {
								// result == true
								if (result === true) {
									res.json({ data: data, status: 200 });
								} else {
									res.send({
										data: "wrong username and password password",
										status: 200,
									});
								}
							}
						);
					}
				}
			}
		);
	} catch (error) {}
};
