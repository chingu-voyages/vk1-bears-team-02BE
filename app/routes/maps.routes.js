module.exports = (app) => {
	const maps = require("../controllers/maps.controllers");

	//get all customer
	app.post("/map-data", maps.create);
	app.get("/map-data", maps.findAll);
	app.get("/map-data/:mapId", maps.findOne);
	app.put("/map-data/:mapId", maps.update);
	app.delete("/map-data/:mapId", maps.delete);
};
