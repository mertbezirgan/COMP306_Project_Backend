const mysql = require("mysql");

const db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "imdb",
	port: 4406,
});

module.exports = db;
