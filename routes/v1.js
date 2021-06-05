const express = require("express");
const router = express.Router();

const homeController = require("../controllers/homeController");

router.post("/home/searchMovies", homeController.searchMovies);

module.exports = router;