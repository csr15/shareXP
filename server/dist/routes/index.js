"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = __importDefault(require("./auth.routes"));
const profile_routes_1 = __importDefault(require("./profile.routes"));
const story_routes_1 = __importDefault(require("./story.routes"));
const search_routes_1 = __importDefault(require("./search.routes"));
const user_stories_routes_1 = __importDefault(require("./user-stories.routes"));
const search_controller_1 = require("../controllers/search.controller");
const story_controller_1 = require("../controllers/story.controller");
const user_stories_controller_1 = require("../controllers/user-stories.controller");
const router = (0, express_1.Router)();
router.get('/sharexp', (_req, res) => {
    res.send('Hello shareXP');
});
router.use('/auth', auth_routes_1.default);
router.use('/profile', profile_routes_1.default);
router.use('/publish', story_routes_1.default);
router.use('/search', search_routes_1.default);
router.use('/userStories', user_stories_routes_1.default);
router.post('/suggestions', search_controller_1.searchController.suggestions);
router.get('/storyData/:storyId', story_controller_1.storyController.getById);
router.get('/author/:uid', user_stories_controller_1.userStoriesController.getAuthor);
exports.default = router;
//# sourceMappingURL=index.js.map