const express = require("express");
const router = express.Router();

//Models
const searchActions = require("../contollers/search");

//search for particular tag
router.get("/",  searchActions.search)

//Top tags
router.get("/topTags", searchActions.topTags);

//Tag stories
router.get("/tagStories/:tagName", searchActions.tagStories);

module.exports = router;
