import { Router } from 'express';
import { accountInfo, updateProfile } from '../../controllers/user/account.controllers';
import { protect } from '../../middleware/auth.middleware';

const router = Router();

router.get("/me", protect, accountInfo);
router.put("/update", updateProfile);

export default router;