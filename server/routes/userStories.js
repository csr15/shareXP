const express = require("express");
const router = express.Router();

//Controllers
const userActions = require("../contollers/userStories");

router.get(
  "/stories/followingTagStories/:uid",
  userActions.followingStories
);

router.get("/stories/topStories", userActions.topStories);

router.get("/stories/latestStories", userActions.latestStories);

module.exports = router;
