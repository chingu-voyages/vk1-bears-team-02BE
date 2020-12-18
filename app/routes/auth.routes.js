const passport = require("passport");
const CLIENT_HOME_PAGE_URL = "http://localhost:3000/login";
// const User = require("../models/users.model");

// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());
module.exports = (app) => {
	const authentication = require("../controllers/authentication.controllers");

	app.post("/admin/login", authentication.loginAdmin);
	app.post("/admin/logout", authentication.logoutAdmin);
	//register user
	// app.get("/register", authentication.register);
	app.post("/register", authentication.register);
	app.post("/login", authentication.login);
	app.get("/logout", authentication.logout);
	//google auth
	app.get("/auth/google/failed", authentication.googleFailedLogin);
	app.get(
		"/google",
		passport.authenticate("google", { scope: ["profile", "email"] })
	);
	app.get(
		"/google/callback",
		passport.authenticate("google", {
			successRedirect: CLIENT_HOME_PAGE_URL,
			failureRedirect: "auth/google/failed",
			session: true,
		})
		// (req, res) => {
		// 	console.log(req.user);
		// 	res.redirect(CLIENT_HOME_PAGE_URL);
		// }

		// authentication.googleCallback
		//authentication.test
	);
	app.get("/auth/login/success", authentication.googleCallback);

	app.get(
		"/redirect",

		authentication.test
	);
};
