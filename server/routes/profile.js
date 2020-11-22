const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

//controllers
const profileAction = require("../contollers/profile");

//Routes

//User details
router.get("/:uid", verifyCookieToken, profileAction.profile);

//Delete story
router.delete(
  "/deleteStory/:storyId",
  verifyCookieToken,
  profileAction.deleteStory
);

//update story view
router.get("/updateView/:storyId", verifyCookieToken, profileAction.updateView);

//Update user details
router.post(
  "/updateProfile/:uid",
  verifyCookieToken,
  profileAction.updateProfile
);

//Follow a tag
router.post("/followTag/:uid", verifyCookieToken, profileAction.followTag);

//Unfollow a tag
router.post("/unFollowTag/:uid", verifyCookieToken, profileAction.unFollowTag);

//Like a story
router.patch("/likeStory/:storyId/:uid", profileAction.likeStroy);

//Unlike a story
router.post("/unLikeStory/:storyId/:uid", profileAction.unLikeStory);

//Delete avatar
router.delete(
  "/deleteAvatar/:uid",
  verifyCookieToken,
  profileAction.deleteAvatar
);

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
module.exports = router;
