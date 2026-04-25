import { Router } from 'express';
import { protect } from '../../middleware/auth.middleware';
import { allFeedbacks, feedbackStatistics, replyUserFeedback, toggleAsFeatured } from '../../controllers/admin/feedback.controllers';

const router = Router();

router.get("/get", allFeedbacks);
router.get("/statistics", feedbackStatistics);
router.post("/reply", replyUserFeedback);
router.put("/marked-featured", toggleAsFeatured);

export default router;