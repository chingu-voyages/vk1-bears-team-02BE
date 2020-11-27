module.exports = (app) => {
	//for testing
	const coordinates = require("../controllers/test.controllers");

	//get all customer
	app.get("/coordinates", coordinates.findAll);
};
