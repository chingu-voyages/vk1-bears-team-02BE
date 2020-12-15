module.exports = (app) => {
	const admins = require("../controllers/admins.controllers");
	const authUser = require("../utilities/check-auth");

	//get all customer
	app.post("/admins", authUser.authenticate, admins.create);
	app.get("/admins", authUser.authenticate, admins.findAll);
	app.get("/admin/:userId", authUser.authenticate, admins.findOne);
	app.put("/admin/:userId", authUser.authenticate, admins.update);
	app.delete("/admin/:userId", authUser.authenticate, admins.delete);
};
