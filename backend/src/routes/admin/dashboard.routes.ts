import { Router } from 'express';
import { protect } from '../../middleware/auth.middleware';
import { dashboardSummaryCards, orderStatusDistribution, recentOrders, topCustomers, topSellingProducts } from '../../controllers/admin/dashboard.controllers';

const router = Router();

router.get("/statistics", dashboardSummaryCards);
router.get("/recent-orders", recentOrders);
router.get("/order-status-distribution", orderStatusDistribution);
router.get("/top-selling-products", topSellingProducts);
router.get("/top-customers", topCustomers);

export default router;