"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_stories_controller_1 = require("../controllers/user-stories.controller");
const router = (0, express_1.Router)();
router.get('/stories/followingTagStories/:uid', user_stories_controller_1.userStoriesController.followingStories);
router.get('/stories/topStories', user_stories_controller_1.userStoriesController.topStories);
router.get('/stories/latestStories', user_stories_controller_1.userStoriesController.latestStories);
exports.default = router;
