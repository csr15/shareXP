const express = require("express");
const router = express.Router();

//contoller
const author = require("../contollers/author");

router.get("/:uid", author);

module.exports = router;
