import { Router } from 'express';
import { register, login, verifyEmail, verifyCode, changePassword, getNewToken, logout } from '../../controllers/user/auth.controllers';
import { protect } from '../../middleware/auth.middleware';

const router = Router();

// Auth
router.post('/register', register);
router.post('/login', login);
router.post("/forgot/verify-email", verifyEmail);
router.post("/forgot/verify-code", verifyCode);
router.post('/forgot/change-password', changePassword);
router.post('/refresh-token', getNewToken);
router.post('/logout', logout);

export default router;