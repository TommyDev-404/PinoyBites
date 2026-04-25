import { Router } from 'express';
import { checkUserIfRated, getAllNotifications, markAllAsRead, markIndividualAsRead, rateProducts, viewUserOrderInfo } from '../../controllers/user/notification.controllers';
import { protect } from '../../middleware/auth.middleware';

const router = Router();

router.get("/get", protect, getAllNotifications);
router.get("/get-order-info", protect, viewUserOrderInfo);
router.get("/check-if-rated", protect, checkUserIfRated);
router.post("/rate-products", protect, rateProducts);
router.put("/read", protect, markIndividualAsRead);
router.put("/read-all", protect, markAllAsRead);

export default router;