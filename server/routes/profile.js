const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

//controllers
const profileAction = require("../contollers/profile");

//Routes

//User details
router.get("/:uid", verifyCookieToken, profileAction.profile);

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
router.post("/likeStory", profileAction.likeStory);

//Unlike a story
router.post("/unLikeStory/:storyId/:uid/:authorId", profileAction.unLikeStory);

//Delete avatar
router.delete("/deleteAvatar/:uid", profileAction.deleteAvatar);

//All notifications
router.get("/notifications/:uid", profileAction.getNotifications);

//Clear notifications
router.patch(
  "/clearNotification/:storyId/:uid",
  profileAction.clearNotification
);

module.exports = router;

function verifyCookieToken(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(403).send("Forbidden");
  } else {
    try {
      jwt.verify(req.cookies.token, "secretkey", (err) => {
        if (err) {
          throw Error();
        }
        next();
      });
    } catch (error) {
      res.clearCookie("token");
      return res.status(400).send(error.message);
    }
  }
}
