import { Router } from 'express';
import authRoutes from './auth.routes';
import profileRoutes from './profile.routes';
import storyRoutes from './story.routes';
import searchRoutes from './search.routes';
import userStoriesRoutes from './user-stories.routes';
import { searchController } from '../controllers/search.controller';
import { storyController } from '../controllers/story.controller';
import { userStoriesController } from '../controllers/user-stories.controller';

const router = Router();

router.get('/sharexp', (_req, res) => {
  res.send('Hello shareXP');
});

router.use('/auth', authRoutes);
router.use('/profile', profileRoutes);
router.use('/publish', storyRoutes);
router.use('/search', searchRoutes);
router.use('/userStories', userStoriesRoutes);
router.post('/suggestions', searchController.suggestions);
router.get('/storyData/:storyId', storyController.getById);
router.get('/author/:uid', userStoriesController.getAuthor);

export default router;
