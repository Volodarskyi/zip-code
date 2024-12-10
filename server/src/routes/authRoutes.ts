import { Router } from 'express';

import authController from '../controllers/authController';

const router = Router();

router.post('/signup', authController.signupController);
router.post('/signin', authController.signinController);

export default router;
