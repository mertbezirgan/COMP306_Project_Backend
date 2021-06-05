const express = require("express");
const router = express.Router();

const movieController = require("../controllers/movieController");

router.get("/sample", movieController.sample);

module.exports = router;