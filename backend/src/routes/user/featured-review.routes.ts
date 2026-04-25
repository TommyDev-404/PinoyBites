import { Router } from 'express';
import { protect } from '../../middleware/auth.middleware';
import { customerReviews } from '../../controllers/user/featured-review.controllers';

const router = Router();

router.get("/get", customerReviews);

export default router;