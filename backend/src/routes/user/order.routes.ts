import { Router } from 'express';
import { placeOrder, getOrders, cancelOrder, checkUserFeedback, submitFeedback } from '../../controllers/user/order.controllers';
import { protect } from '../../middleware/auth.middleware';

const router = Router();

router.post("/place",protect,  placeOrder);
router.post("/submit-feedback",protect,  submitFeedback);
router.get("/check-feedback", protect, checkUserFeedback);
router.get("/get", protect, getOrders);
router.delete("/cancel", protect, cancelOrder);

export default router;