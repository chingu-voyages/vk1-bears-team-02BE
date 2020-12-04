const passport = require("passport");

// const User = require("../models/users.model");

// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());
module.exports = (app) => {
	const authentication = require("../controllers/authentication.controllers");

	//register user
	// app.get("/register", authentication.register);
	app.post("/register", authentication.register);
	app.post("/login", authentication.login);
	app.get("/logout", authentication.logout);
	app.get(
		"/google",
		passport.authenticate("google", { scope: ["profile", "email"] })
	);
	app.get(
		"/google/callback",
		passport.authenticate("google", {
			failureRedirect: "/failed",
			// session: false,
		}),
		authentication.googleCallback
	);
};
