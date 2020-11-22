const express = require("express");
const router = express.Router();

//controllers
const profileAction = require("../contollers/profile");

//Routes

//User details
router.get("/:uid", profileAction.profile);

//Delete story
router.delete(
  "/deleteStory/:storyId",
  profileAction.deleteStory
);

//update story view
router.get("/updateView/:storyId", profileAction.updateView);

//Update user details
router.post(
  "/updateProfile/:uid",
  profileAction.updateProfile
);

//Follow a tag
router.post("/followTag/:uid", profileAction.followTag);

//Unfollow a tag
router.post("/unFollowTag/:uid", profileAction.unFollowTag);

//Like a story
router.patch("/likeStory/:storyId/:uid", profileAction.likeStroy);

//Unlike a story
router.post("/unLikeStory/:storyId/:uid", profileAction.unLikeStory);

//Delete avatar
router.delete(
  "/deleteAvatar/:uid",
  profileAction.deleteAvatar
);

module.exports = router;
