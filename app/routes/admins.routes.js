module.exports = (app) => {
	const admins = require("../controllers/admins.controllers");

	//get all customer
	app.post("/admins", admins.create);
	app.get("/admins", admins.findAll);
	app.get("/admin/:userId", admins.findOne);
	app.put("/admin/:userId", admins.update);
	app.delete("/admin/:userId", admins.delete);
};
