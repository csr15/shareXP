import { Router } from 'express';
import { storyController } from '../controllers/story.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.post('/:uid', authMiddleware, storyController.publish);
router.post('/comment/:storyId', storyController.addComment);
router.patch('/updateStory/:storyId', authMiddleware, storyController.update);

export default router;
