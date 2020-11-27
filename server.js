require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

var cors = require("cors");

// create express app
const app = express();

app.use(cors());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// Configuring the database
const dbConfig = require("./config/database.config.js");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose
	.connect(dbConfig.url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
	.then(() => {
		console.log("Successfully connected to the database");
	})
	.catch((err) => {
		console.log("Could not connect to the database. Exiting now...", err);
		process.exit();
	});

// define a simple route
app.get("/", (req, res) => {
	res.json({
		message: "E Sagip Application",
	});
});

// Place routes here
// example route path
// require("./app/routes/user.routes")(app);
require("./app/routes/users.routes")(app);
require("./app/routes/test.routes")(app);
// console.log(`date now ${Date.now}`);

// listen for requests (for heroku)
let port = process.env.PORT;
if (port == null || port == "") {
	port = 5000;
}
//app.listen(port);

app.listen(port, () => {
	console.log(`Server is listening on port ${port}`);
});
