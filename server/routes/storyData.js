const express = require('express');
const router = express.Router();

const storyData = require("../contollers/storyData");

router.get("/:storyId" , storyData)

module.exports = router;