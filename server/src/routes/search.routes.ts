import { Router } from 'express';
import { searchController } from '../controllers/search.controller';

const router = Router();

router.get('/', searchController.search);
router.get('/topTags', searchController.topTags);
router.get('/tagStories/:tagName', searchController.tagStories);

export default router;
