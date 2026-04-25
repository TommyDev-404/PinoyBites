import { Router } from 'express';
import { toggleUserFavoriteProducts, allProducts, featuredProducts, userFavoriteProducts } from '../../controllers/user/product.controllers';
import { protect } from '../../middleware/auth.middleware';

const router = Router();

router.get("/", allProducts); // dont touch, no path because params make it for showing & searching product
router.get("/featured", featuredProducts);
router.post("/toggle-favorites", protect, toggleUserFavoriteProducts);
router.get("/user-favorites", protect, userFavoriteProducts);

export default router;