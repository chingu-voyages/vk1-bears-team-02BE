const bcrypt = require("bcrypt");
const saltRounds = 10;
const passport = require("passport");
const findOrCreate = require("mongoose-findorcreate");
const User = require("../models/users.model");
const Admin = require("../models/admins.models");
const jwt = require("jsonwebtoken");

const httpsStatus = require("../utilities/httpStatus");

const nodemailer = require("nodemailer");

const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(User.createStrategy());

passport.serializeUser(function (user, done) {
	done(null, user.id);
});

passport.deserializeUser(function (id, done) {
	User.findById(id, function (err, user) {
		done(err, user);
	});
});

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET,
			callbackURL: "http://localhost:5000/google/callback", //we will change this once we set up our remote server
			// passReqToCallback: true,
			userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
		},
		async (accessToken, refreshToken, profile, cb) => {
			try {
				// console.log(profile);
				await User.findOrCreate(
					{
						googleId: profile.id,
						username: profile.emails[0].value,
						email: profile.emails[0].value,
						displayName: profile.displayName,
						familyName: profile.name.familyName,
						givenName: profile.name.givenName,
						photo: profile.photos[0].value,
					},
					function (err, user) {
						return cb(err, user);
					}
				);
			} catch (error) {
				console.log(error);
			}
		}
	)
);

// exports.authGoogle = (req, res) => {
// 	//type of strategy
// 	console.log("open google");
// 	passport.authenticate("google", { scope: ["profile"] });
// 	res.json({ message: "we're here" });
// };

exports.googleCallback = (req, res) => {
	console.log(`from ${req.user}`);
	console.log(req.session);
	// console.log(req);
	// res.redirect("http://localhost:3000/user/flood");
	// res.json({ message: `welcome ${req.user}` });
	res.status(httpsStatus.OK).json({
		user: req.user,
		message: "unable to authorize user",
		status: httpsStatus.OK,
	});
};

exports.googleFailedLogin = (req, res) => {
	res.status(httpsStatus.UNAUTHORIZED).json({
		message: "unable to authorize user",
		status: httpsStatus.UNAUTHORIZED,
	});
};

exports.test = (req, res) => {
	console.log(`from ${req.user}`);
	res.send(req.user);
};

// exports.register = async (req, res) => {
// 	const { username, email, password } = req.body;

// 	try {
// 		await User.register(
// 			{ username: username, email: email, passport: passport },
// 			password,
// 			(err, user) => {
// 				if (err) {
// 					console.log(err);
// 				} else {
// 					passport.authenticate("local")(req, res, () => {
// 						res.json({ data: user, status: 200 });
// 					});
// 				}
// 			}
// 		);
// 	} catch (error) {
// 		res.send(error);
// 	}
// };

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
	port: 465, // true for 465, false for other ports
	host: "smtp.gmail.com",
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASSWORD,
	},
	secure: true,
});

exports.register = async (req, res) => {
	const { username, password, email, givenName, familyName } = req.body;

	bcrypt.hash(password, saltRounds, async (err, hash) => {
		const user = new User({
			username: username,
			password: hash,
			email: email,
			givenName: givenName,
			familyName: familyName,
		});
		try {
			const data = await user.save();
			console.log(`data._id`);
			console.log(data._id);

			const payload = {
				username: username,
				email: email,
				userId: data._id,
				role: "civilian",
			};
			//jwt key
			const option = {
				expiresIn: "1h",
			};
			const token = jwt.sign(payload, "secret", option);

			res.status(httpsStatus.OK).json({
				data: data,
				token: token,
				message: "user added",
				status: httpsStatus.OK,
				role: "civilian",
			});

			const mailData = {
				from: "esagipapplication@gmail.com", // sender address
				to: `${email}`, // list of receivers
				subject: "Account Created",
				// text: "That was easy!",
				html: `<b>Hey there! ${username} </b>
						 <br> Congratulations, you are now registered to e-sagip, you can now send distress call wherever you are.<br/>
						 
						 `,
			};

			transporter.sendMail(mailData, function (err, info) {
				if (err) console.log(err);
				else console.log(info);
			});
		} catch (error) {
			res.status(httpsStatus.INTERNAL_SERVER_ERROR).json({
				message:
					error.message || "Some error occurred while creating user data.",
			});
		}
	});
};

exports.login = async (req, res) => {
	const { username, password } = req.body;
	console.log(req.body);
	const user = new User({
		username: username,
		password: password,
	});

	// try {
	// 	req.login(user, (err) => {
	// 		if (err) {
	// 			console.log(`err:${err}`);
	// 		} else {
	// 			passport.authenticate("local")(req, res, async () => {
	// 				const data = await User.findOne(
	// 					{ username: username },
	// 					(err, foundUser) => {
	// 						res.json({ data: foundUser, status: 200 });
	// 					}
	// 				);
	// 			});
	// 		}
	// 	});
	// } catch (error) {
	// 	console.log(error);
	// }

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
									const payload = {
										username: foundUser.username,
										email: foundUser.email,
										userId: foundUser._id,
										role: "civilian",
									};
									//jwt key
									const option = {
										expiresIn: "1h",
									};
									const token = jwt.sign(payload, "secret", option);

									res.status(httpsStatus.OK).json({
										data: data,
										token: token,
										message: "user login",
										role: "civilian",
										status: httpsStatus.OK,
									});
									// res.json({ data: data, status: 200 });
								} else {
									res.status(httpsStatus.OK).json({
										// data: data,
										// token: token,
										message: "invalid credentials",
										status: httpsStatus.OK,
									});
								}
							}
						);
					} else {
						res.status(httpsStatus.OK).json({
							// data: data,
							// token: token,
							message: "invalid credentials",
							status: httpsStatus.OK,
						});
					}
				}
			}
		);
	} catch (error) {}
};

exports.loginAdmin = async (req, res) => {
	const { username, password } = req.body;

	try {
		const data = await Admin.findOne(
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
									const payload = {
										username: foundUser.username,
										email: foundUser.email,
										userId: foundUser._id,
										role: "admin",
									};
									//jwt key
									const option = {
										expiresIn: "1h",
									};
									const token = jwt.sign(payload, "secret", option);

									res.status(httpsStatus.OK).json({
										data: data,
										token: token,
										message: "user login",
										status: httpsStatus.OK,
										role: "admin",
									});
									// res.json({ data: data, status: 200 });
								} else {
									res.status(httpsStatus.OK).json({
										// data: data,
										// token: token,
										message: "invalid credentials",
										status: httpsStatus.OK,
									});
								}
							}
						);
					} else {
						res.status(httpsStatus.OK).json({
							// data: data,
							// token: token,
							message: "invalid credentials",
							status: httpsStatus.OK,
						});
					}
				}
			}
		);
	} catch (error) {}
};

exports.logout = async (req, res) => {
	try {
		// req.logout();
		// res.json({ message: "logout successfully", status: 200 });
	} catch (error) {
		res.status(httpsStatus.INTERNAL_SERVER_ERROR).json({
			message: error.message || "Some error occurred while creating user data.",
		});
	}
};

exports.logoutAdmin = async (req, res) => {
	try {
		// req.logout();
		// res.json({ message: "logout successfully", status: 200 });
	} catch (error) {
		res.status(httpsStatus.INTERNAL_SERVER_ERROR).json({
			message: error.message || "Some error occurred while creating user data.",
		});
	}
};
