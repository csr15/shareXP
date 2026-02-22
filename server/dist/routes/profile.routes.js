"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const profile_controller_1 = require("../controllers/profile.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.get('/:uid', profile_controller_1.profileController.getProfile);
router.delete('/deleteStory/:storyId', auth_middleware_1.authMiddleware, profile_controller_1.profileController.deleteStory);
router.get('/updateView/:storyId', profile_controller_1.profileController.updateView);
router.post('/updateProfile/:uid', auth_middleware_1.authMiddleware, profile_controller_1.profileController.updateProfile);
router.post('/followTag/:uid', auth_middleware_1.authMiddleware, profile_controller_1.profileController.followTag);
router.post('/unFollowTag/:uid', auth_middleware_1.authMiddleware, profile_controller_1.profileController.unFollowTag);
router.post('/likeStory', profile_controller_1.profileController.likeStory);
router.post('/unLikeStory/:storyId/:uid/:authorId', profile_controller_1.profileController.unlikeStory);
router.delete('/deleteAvatar/:uid', auth_middleware_1.authMiddleware, profile_controller_1.profileController.deleteAvatar);
router.get('/notifications/:uid', profile_controller_1.profileController.getNotifications);
router.patch('/clearNotification/:storyId/:uid', profile_controller_1.profileController.clearNotification);
exports.default = router;
//# sourceMappingURL=profile.routes.js.map