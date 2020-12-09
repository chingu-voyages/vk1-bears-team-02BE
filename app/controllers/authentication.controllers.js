const passport = require("passport");
const findOrCreate = require("mongoose-findorcreate");
const User = require("../models/users.model");

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
				console.log(profile);
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
	console.log(req.user);
	res.redirect("http://localhost:3000/user/flood");
	// res.json({ message: `welcome ${req.user}` });
};

exports.register = async (req, res) => {
	const { username, email, password } = req.body;

	try {
		await User.register(
			{ username: username, email: email, passport: passport },
			password,
			(err, user) => {
				if (err) {
					return res
						.status(400)
						.json({ msg: "Username already taken" });
				} else {
					passport.authenticate("local")(req, res, () => {
						res.json({ data: user, status: 200 });
						return res
							.status(200)
							.json({ msg: "Success" });
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
				return res
					.status(400)
					.json({ msg: "Login Failed" });
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
	} catch (error) { }
};
