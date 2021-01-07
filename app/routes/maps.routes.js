module.exports = (app) => {
	const maps = require("../controllers/maps.controllers");

	//get all customer
	app.post("/map-data", maps.create);
	app.get("/map-data", maps.findAll);
	app.get("/map-data-fire", maps.CountFireDistress);
	app.get("/map-data-flood", maps.CountFloodDistress);
	app.get("/map-data-earthquake", maps.CountEarthquakeDistress);
	app.get("/map-data-report", maps.mapDataReport);
	app.get("/map-data/:mapId", maps.findOne);
	app.put("/map-data/:mapId", maps.update);
	app.delete("/map-data/:mapId", maps.delete);
	app.get("/map-data/map-history/:userId", maps.findAllByCivilianId);
};
