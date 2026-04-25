import { Router } from 'express';
import { rateSystemExperience, canUserRate } from '../../controllers/user/rating.controllers';
import { protect } from '../../middleware/auth.middleware';

const router = Router();

router.get("/can-rate/:userId", protect, canUserRate);
router.post("/rate", protect, rateSystemExperience);

export default router;