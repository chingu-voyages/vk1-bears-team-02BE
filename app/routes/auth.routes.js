module.exports = (app) => {
	const authentication = require("../controllers/authentication.controllers");

	//register user
	// app.get("/register", authentication.register);
	app.post("/register", authentication.register);
	app.post("/login", authentication.login);
	app.get("/logout", authentication.logout);
};
