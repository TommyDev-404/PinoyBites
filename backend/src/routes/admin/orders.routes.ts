import { Router } from 'express';
import { protect } from '../../middleware/auth.middleware';
import { allOrders, allOrdersStatistics, removeOrder, updateOrder } from '../../controllers/admin/orders.controllers';

const router = Router();

router.get('/get-statistics', allOrdersStatistics);
router.get('/get-all', allOrders);
router.put('/update-status', updateOrder);
router.delete('/remove', removeOrder);

export default router;