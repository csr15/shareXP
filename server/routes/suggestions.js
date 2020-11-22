const express = require("express");
const router = express.Router();

//Contollers
const suggestions = require("../contollers/suggestions");

// Eg: /suggestions/lorem
router.post("/", suggestions);

module.exports = router;
