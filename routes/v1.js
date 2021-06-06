const express = require("express");
const router = express.Router();

const homeController = require("../controllers/homeController");
const movieController = require("../controllers/movieController");
const directorController = require("../controllers/directorController");
const actorController = require("../controllers/actorController");

router.post("/home/searchMovies", homeController.searchMovies);

router.get("/movie/:id", movieController.getById);

router.get("/director/:id", directorController.getById);

router.get("/actor/:id", actorController.getById);

module.exports = router;