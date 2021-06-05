const mysql = require("mysql");
require("dotenv").config(); //instatiate environment variables

const db = mysql.createConnection({
	host: process.env.DB_HOST || "database-1.cdu6hglzwn5n.eu-central-1.rds.amazonaws.com",
	user: process.env.DB_USER || "admin",
	password: process.env.DB_PASSWORD || "comp306.",
	database: process.env.DB_SCHEMA || "imdb",
	port: process.env.DB_PORT || 3306,
});
module.exports = db;
