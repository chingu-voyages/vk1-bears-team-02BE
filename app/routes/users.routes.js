const { request, response } = require("express");
const userModel = require("../models/users.models")




var MongoClient = require('mongodb').MongoClient;

const express = require("express");
const router = express.Router();
//const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//const config = require("config");
const { check, validationResult } = require("express-validator");

module.exports = (app) => {

	// @route     POST api/users
	// @desc      Register a user
	// @access    Public
	app.post(
		"/register",
		[
			// check("name", "Please add name").not().isEmpty(),
			check("email", "Please include a valid email").isEmail(),
			// check(
			// 	"password",
			// 	"Please enter a password with 6 or more characters"
			// ).isLength({ min: 6 }),
		],
		async (req, res) => {



			try {
				const { username, first_name, last_name, email, password, contact, house_number, street_address, city, state, zipcode } = req.body;
				let user = await userModel.findOne({ email });
				const errors = validationResult(req);
				if (!errors.isEmpty()) {
					return res.status(400).json({ errors: errors.array() });
				}

				if (user) {
					return res
						.status(400)
						.json({ error: true, msg: "E-mail already exists" });
				}

				user = new userModel({

					username, first_name, last_name, email, password, contact, house_number, street_address, city, state, zipcode
				});

				// const salt = await bcrypt.genSalt(10);

				// user.password = await bcrypt.hash(password, salt);

				await user.save();

				// const payload = {
				// 	user: {
				// 		id: user.id,
				// 	},
				// };

				// jwt.sign(
				//   payload,
				//   config.get("jwtSecret"),
				//   {
				//     expiresIn: 360000,
				//   },
				//   (err, token) => {
				//     if (err) throw err;
				//     res.json({ token });
				//   }
				// );
			} catch (err) {
				console.error(err.message);
				res.status(500).send("Server Error");
			}
		}
	);

	app.post("/login", async (req, res) => {
		try {
			const { username, password } = req.body
			let user = await userModel.findOne({ username })

			if (!user) {
				return res.status(401).json({ msg: "User with this username does not exist!" })

			}

			let isPasswordMatch = () => {
				if (password == user.password)
					return res.status(401).json({ msg: "Success" })
				else
					return res.status(401).json({ msg: "Wrong user credentials!" })
			}
			isPasswordMatch()
		} catch (error) {
			console.log(error.message)
			return res.status(500).json({ msg: "LOGIN ERROR" })

		}
	})

	app.get("/findall", (request, response) => {
		var MongoClient = require('mongodb').MongoClient;
		var url = process.env.DB_REMOTE;

		MongoClient.connect(url, function (err, db) {
			if (err) throw err;
			var dbo = db.db("Users");
			//Find all documents in the customers collection:
			dbo.collection("users").find({}).toArray(function (err, result) {
				if (err) throw err;
				console.log(result);
				db.close();
			});
		});


	});
}
//module.exports = router;











// module.exports = (app) => {
// 	const users = require("../controllers/users.controllers");

// 	//get all customer
// 	//app.get("/users", userModel.findAll);

// 	//resgister
// 	app.post("/register", (request, response) => {
// 		const signUp = new userModel({
// 			first_name: request.body.first_name,
// 			last_name: request.body.last_name,
// 			email: request.body.email,
// 			contact: request.body.contact,
// 			house_number: request.body.house_number,
// 			street_address: request.body.street_address,
// 			city: request.body.city,
// 			state: request.body.state,
// 			zipcode: request.body.zipcode
// 		})
// 		signUp.save()
// 			.then(data => {
// 				response.json(data)
// 			}).
// 			catch(error => {
// 				response.json(error)
// 			})





// };
