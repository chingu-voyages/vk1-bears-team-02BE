const mongoose = require("mongoose");

exports.findAll = async (req, res) => {
	try {
		const data = [
			{
				_id: "5f9adcafeafe552f7859326f",
				first_name: "Dylan",
				last_name: "Funcion",
				email: "dylan@gmail.com",
				contact: 9128885,
				image: "img/dylan.png",
				house_number: "520-B",
				street_address: "di mahanap hanap street",
				city: "star city",
				state: "golden state",
				zipcode: 9111,
			},
			{
				_id: "5f9d2544e23f610418e2c7b3",
				first_name: "Kaori",
				last_name: "Miyazono",
				email: "kaori_miyazono@gmail.com",
				contact: 918263346,
				image:
					"https://pbs.twimg.com/profile_images/646859109438984196/WV6Tv23S.jpg",
				house_number: "520-B",
				street_address: "di mahanap hanap street",
				city: "star city",
				state: "golden state",
				zipcode: 9111,
				__v: 0,
			},
		];
		res.send(data);
	} catch (error) {
		res.status(500).send({
			message:
				error.message || "Some error occurred while creating customer data.",
		});
	}
};
