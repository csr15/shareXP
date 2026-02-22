import { Router } from 'express';
import { profileController } from '../controllers/profile.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.get('/:uid', profileController.getProfile);
router.delete('/deleteStory/:storyId', authMiddleware, profileController.deleteStory);
router.get('/updateView/:storyId', profileController.updateView);
router.post('/updateProfile/:uid', authMiddleware, profileController.updateProfile);
router.post('/followTag/:uid', authMiddleware, profileController.followTag);
router.post('/unFollowTag/:uid', authMiddleware, profileController.unFollowTag);
router.post('/likeStory', profileController.likeStory);
router.post('/unLikeStory/:storyId/:uid/:authorId', profileController.unlikeStory);
router.delete('/deleteAvatar/:uid', authMiddleware, profileController.deleteAvatar);
router.get('/notifications/:uid', profileController.getNotifications);
router.patch('/clearNotification/:storyId/:uid', profileController.clearNotification);

export default router;
