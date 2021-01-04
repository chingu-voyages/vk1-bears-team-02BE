module.exports = (app) => {
	const users = require("../controllers/users.controllers");
	const authUser = require("../utilities/check-auth");

	//get all customer
	app.post("/add-user-civilian", users.create);
	app.get("/users", users.findAll);
	//authUser.authenticate,
	app.get("/user/:username", users.findOne);
	app.post("/update", users.update);
	app.delete("/user/:userId", users.delete);
};
