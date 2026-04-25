import { Router } from 'express';
import { protect } from '../../middleware/auth.middleware';
import { lowStockProducts, orderStatusDistribution, topCustomers, topSellingProducts } from '../../controllers/admin/analytics.controllers';

const router = Router();

router.get("/top-selling-products", topSellingProducts);
router.get("/top-customers", topCustomers);
router.get("/order-stattus-distribution", orderStatusDistribution);
router.get("/low-stock-products", lowStockProducts);


export default router;