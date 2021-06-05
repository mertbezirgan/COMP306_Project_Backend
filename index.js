const express = require("express");
const db = require("./config/dbConfig");
const cors = require("cors");

const app = express();
const PORT = 3002;
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
	db.query("SELECT * FROM movies WHERE year > 2005", (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.send(result);
		}
	});
});

app.listen(PORT, () => {
	console.log(`Example app listening at http://localhost:${PORT}`);
});
