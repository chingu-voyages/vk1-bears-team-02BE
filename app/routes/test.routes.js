const markerModel = require("../models/test.models")

module.exports = (app) => {
	//for testing
	const coordinates = require("../controllers/test.controllers");

	//get all customer
	app.get("/coordinates", coordinates.findAll);

	app.post("/addMarker", (req, res) => {
		const addMarker = new markerModel({
			type: req.body.type,

			properties: {
				message: req.body.message,
				iconSize: [req.body.len, req.body.wid]
				,
			},
			geometry: {
				type2: req.body.type2,
				coordinates: [req.body.lat, req.body.long]
				,
			}
		})
		addMarker.save()
			.then(data => {
				res.json(data)
			}).
			catch(error => {
				res.json(error)
			})
	});


};
