const express = require("express");
const router = express.Router();

const storyAction = require("../contollers/story.js");

router.post("/:uid", storyAction.publishStory);

router.post("/comment/:storyId", storyAction.comment);

module.exports = router;
