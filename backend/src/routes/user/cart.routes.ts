import { Router } from 'express';
import { addToCart, checkPromoForUser, getCart, removeCartItem, updateCart } from '../../controllers/user/cart.controllers';
import { protect } from '../../middleware/auth.middleware';

const router = Router();

router.post("/add", protect, addToCart);
router.post("/update", protect, updateCart);
router.get("/get", protect, getCart);
router.delete("/remove", protect, removeCartItem);
router.get("/get-promo", protect, checkPromoForUser);

export default router;