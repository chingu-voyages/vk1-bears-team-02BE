module.exports = (app) => {
	const users = require("../controllers/users.controllers");

	//get all customer
	app.get("/users", users.findAll);
};
