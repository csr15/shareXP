import { Router } from 'express';
import { authController } from '../controllers/auth.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.post('/checkUserName/:userName', authController.checkUserName);
router.post('/mailValidation/:mail', authController.checkMail);
router.post('/signup', authController.signup);
router.post('/signin', authController.signin);
router.post('/googleAuth', authController.googleAuth);
router.get('/checkAuth', authController.checkAuth);
router.delete('/deleteAccount/:uid', authMiddleware, authController.deleteAccount);

export default router;
