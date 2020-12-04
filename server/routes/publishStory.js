const express = require("express");
const router = express.Router();

const storyAction = require("../contollers/story.js");

router.post("/:uid", storyAction.publishStory);

router.post("/comment/:storyId", storyAction.comment);

router.patch("/updateStory/:storyId", storyAction.updateStory)

module.exports = router;
