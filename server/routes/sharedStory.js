const express = require("express");
const router = express.Router();

//Controllers
const storyController = require("../contollers/sharedStory");

router.get("/:storyId", storyController.sharedStoryHandler);

module.exports = router;
