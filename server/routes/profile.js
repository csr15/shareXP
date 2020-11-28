const express = require("express");
const router = express.Router();

//controllers
const profileAction = require("../contollers/profile");

//Routes

//User details
router.get("/:uid", profileAction.profile);

//Delete story
router.delete("/deleteStory/:storyId", profileAction.deleteStory);

//update story view
router.get("/updateView/:storyId", profileAction.updateView);

//Update user details
router.post("/updateProfile/:uid", profileAction.updateProfile);

//Follow a tag
router.post("/followTag/:uid", profileAction.followTag);

//Unfollow a tag
router.post("/unFollowTag/:uid", profileAction.unFollowTag);

//Like a story
router.post(
  "/likeStory",
  profileAction.likeStory
);

//Unlike a story
router.post("/unLikeStory/:storyId/:uid/:authorId", profileAction.unLikeStory);

//Delete avatar
router.delete("/deleteAvatar/:uid", profileAction.deleteAvatar);

//All notifications
router.get("/notifications/:uid", profileAction.getNotifications)

//Clear notifications
router.patch("/clearNotification/:storyId/:uid", profileAction.clearNotification);

module.exports = router;
