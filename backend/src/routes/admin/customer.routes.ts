import { Router } from 'express';
import { protect } from '../../middleware/auth.middleware';
import { allCustomers, allCustomersStatistics, banCustomerController, customerOrderHistory, unbanCustomerController } from '../../controllers/admin/customer.controllers';

const router = Router();

router.get("/statistics", allCustomersStatistics);
router.get("/get-all", allCustomers);
router.get("/orders-history", customerOrderHistory);
router.post("/ban", banCustomerController);
router.delete("/unban", unbanCustomerController);

export default router;