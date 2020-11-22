const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

//Controllers
const userActions = require("../contollers/userStories");

router.get(
  "/stories/followingTagStories/:uid",
  verifyCookieToken,
  userActions.followingStories
);

router.get("/stories/topStories", userActions.topStories);

router.get("/stories/latestStories", userActions.latestStories);

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
