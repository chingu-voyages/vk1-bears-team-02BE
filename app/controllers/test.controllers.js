const mongoose = require("mongoose");

exports.findAll = async (req, res) => {
	try {
		// var data = {
		// 	type: "FeatureCollection",
		// 	features: [
		// 		{
		// 			type: "Feature",
		// 			properties: {
		// 				message: "Foo",
		// 				iconSize: [60, 60],
		// 			},
		// 			geometry: {
		// 				type: "Point",
		// 				coordinates: [-66.324462890625, -16.024695711685304],
		// 			},
		// 		},
		// 		{
		// 			type: "Feature",
		// 			properties: {
		// 				message: "Bar",
		// 				iconSize: [50, 50],
		// 			},
		// 			geometry: {
		// 				type: "Point",
		// 				coordinates: [-61.2158203125, -15.97189158092897],
		// 			},
		// 		},
		// 		{
		// 			type: "Feature",
		// 			properties: {
		// 				message: "Baz",
		// 				iconSize: [40, 40],
		// 			},
		// 			geometry: {
		// 				type: "Point",
		// 				coordinates: [-63.29223632812499, -18.28151823530889],
		// 			},
		// 		},
		// 	],
		// };
		var MongoClient = require('mongodb').MongoClient;
		var url = process.env.DB_REMOTE;

		MongoClient.connect(url, function (err, db) {
			if (err) throw err;
			var dbo = db.db("test");
			//Find all documents in the customers collection:
			dbo.collection("mapmarkers").find({}).toArray(function (err, result) {
				if (err) throw err;
				console.log(result);
				res.send({ data: result, statusCode: 201 });
				db.close();
			});
		});
	} catch (error) {
		res.status(500).send({
			message:
				error.message || "Some error occurred while creating customer data.",
		});
	}
};
//https://docs.mapbox.com/mapbox-gl-js/example/custom-marker-icons/
// {
//     lng: 120.81604, //n to s
//     lat: 14.852739, //e to w
//     description: "Earthquake at this location",
// },
// {
//     lng: 120.608589, //n to s
//     lat: 15.80002, //e to w
//     description: "flashflood at this location",
// },
// {
//     lng: 121.050865, //n to s
//     lat: 14.517618, //e to w
//     description: "Hail Storm at this location",
// },
