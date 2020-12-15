module.exports = (app) => {
	const users = require("../controllers/users.controllers");
	const authUser = require("../utilities/check-auth");

	//get all customer
	app.get("/users", users.findAll);
	app.get("/user/:userId", authUser.authenticate, users.findOne);
};
