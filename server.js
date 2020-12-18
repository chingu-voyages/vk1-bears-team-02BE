require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");

const cors = require("cors");
// create express app
const app = express();

app.use(cors());

app.use(cookieParser());
app.use(
	session({
		secret: "user login",
		resave: false,
		saveUninitialized: true,
		cookie: { secure: true },
	})
);

app.use(passport.initialize());
app.use(passport.session());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// Configuring the database
const dbConfig = require("./config/database.config.js");
const mongoose = require("mongoose");

// mongoose.Promise = global.Promise;

// Connecting to the database
mongoose
	.connect(dbConfig.url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false,
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
require("./app/routes/auth.routes")(app);
require("./app/routes/users.routes")(app);
require("./app/routes/admins.routes")(app);
require("./app/routes/maps.routes")(app);
require("./app/routes/test.routes")(app);
// console.log(`date now ${Date.now}`);
// add another route for user registration
// listen for requests (for heroku)
let port = process.env.PORT;
if (port == null || port == "") {
	port = 5000;
}
//app.listen(port);

app.listen(port, () => {
	console.log(`Server is listening on port ${port}`);
});
