"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const story_controller_1 = require("../controllers/story.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.post('/:uid', auth_middleware_1.authMiddleware, story_controller_1.storyController.publish);
router.post('/comment/:storyId', story_controller_1.storyController.addComment);
router.patch('/updateStory/:storyId', auth_middleware_1.authMiddleware, story_controller_1.storyController.update);
exports.default = router;
//# sourceMappingURL=story.routes.js.map