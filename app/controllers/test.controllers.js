const mongoose = require("mongoose");

exports.findAll = async (req, res) => {
	try {
		var data = {
			type: "FeatureCollection",
			features: [
				{
					type: "Feature",
					properties: {
						message: "Foo",
						iconSize: [60, 60],
					},
					geometry: {
						type: "Point",
						coordinates: [-66.324462890625, -16.024695711685304],
					},
				},
				{
					type: "Feature",
					properties: {
						message: "Bar",
						iconSize: [50, 50],
					},
					geometry: {
						type: "Point",
						coordinates: [-61.2158203125, -15.97189158092897],
					},
				},
				{
					type: "Feature",
					properties: {
						message: "Baz",
						iconSize: [40, 40],
					},
					geometry: {
						type: "Point",
						coordinates: [-63.29223632812499, -18.28151823530889],
					},
				},
			],
		};
		res.send({ data: data, statusCode: 201 });
	} catch (error) {
		res.status(500).send({
			message:
				error.message || "Some error occurred while creating customer data.",
		});
	}
};
