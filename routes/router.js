const express = require("express");
const route = express.Router();
const controller = require("../controller/controller");

// User Route
route.get("/bollinger", controller.lowerBand);

module.exports = route;
