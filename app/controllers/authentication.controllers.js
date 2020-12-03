const bcrypt = require("bcrypt");
const saltRounds = 10;
const passport = require("passport");
const User = require("../models/users.model");

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.register = async (req, res) => {
	const { username, email, password } = req.body;

	try {
		await User.register(
			{ username: username, email: email, passport: passport },
			password,
			(err, user) => {
				if (err) {
					console.log(err);
				} else {
					passport.authenticate("local")(req, res, () => {
						res.json({ data: user, status: 200 });
					});
				}
			}
		);
	} catch (error) {
		res.send(error);
	}

	// bcrypt.hash(password, saltRounds, async (err, hash) => {
	// 	// Store hash in your password DB.

	// 	const user = new User({
	// 		username: username,
	// 		email: email,
	// 		password: hash,
	// 	});

	// 	try {
	// 		const data = await user.save();
	// 		res.json({ data: data, status: 200 });
	// 	} catch (error) {
	// 		res.send(error);
	// 	}
	// });
};

exports.login = async (req, res) => {
	const { username, password } = req.body;

	const user = new User({
		username: username,
		password: password,
	});

	try {
		req.login(user, (err) => {
			if (err) {
				console.log(`err:${err}`);
			} else {
				passport.authenticate("local")(req, res, async () => {
					const data = await User.findOne(
						{ username: username },
						(err, foundUser) => {
							res.json({ data: foundUser, status: 200 });
						}
					);
				});
			}
		});
	} catch (error) {
		console.log(error);
	}

	// try {
	// 	const data = await User.findOne(
	// 		{ username: username },
	// 		(error, foundUser) => {
	// 			if (error) {
	// 				console.log(`error:${error}`);
	// 			} else {
	// 				if (foundUser) {
	// 					// if (foundUser.password === password) {
	// 					// 	res.json({ data: data, status: 200 });
	// 					// } else {
	// 					// 	res.json({ data: "error,wrong password" });
	// 					// }

	// 					bcrypt.compare(
	// 						password,
	// 						foundUser.password,
	// 						async (err, result) => {
	// 							// result == true
	// 							if (result === true) {
	// 								res.json({ data: data, status: 200 });
	// 							} else {
	// 								res.send({
	// 									data: "wrong username and password password",
	// 									status: 200,
	// 								});
	// 							}
	// 						}
	// 					);
	// 				}
	// 			}
	// 		}
	// 	);
	// } catch (error) {}
};

exports.logout = async (req, res) => {
	try {
		req.logout();
		res.json({ message: "logout successfully", status: 200 });
	} catch (error) {}
};
