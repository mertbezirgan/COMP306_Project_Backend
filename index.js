const express = require("express");
require("dotenv").config(); //instatiate environment variables
const cors = require("cors");
const { rs, re } = require("./utils/utils");
const v1 = require("./routes/v1");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());

app.use(v1);

// Test endpoint
app.get("/", (req, res) => {
	rs(res, true);
});

app.listen(PORT, () => {
	console.log(`Example app listening at http://localhost:${PORT}`);
});

//This is here to handle all the uncaught promise rejections
process.on("unhandledRejection", (error) => {
    if (error) {
        console.error("Uncaught Error " + error);
    } else {
        console.error("UNDEFINED ERROR WAS CAUGHT");
    }
});
