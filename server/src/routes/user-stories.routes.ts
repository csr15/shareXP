import { Router } from 'express';
import { userStoriesController } from '../controllers/user-stories.controller';

const router = Router();

router.get('/stories/followingTagStories/:uid', userStoriesController.followingStories);
router.get('/stories/topStories', userStoriesController.topStories);
router.get('/stories/latestStories', userStoriesController.latestStories);

export default router;
