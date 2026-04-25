import { Router } from 'express';
import { protect } from '../../middleware/auth.middleware';
import { allAdminNotifications, markReadNotif, notificationCount } from '../../controllers/admin/notification.controllers';

const router = Router();

router.get('/get', allAdminNotifications);
router.get('/get/count', notificationCount);
router.put('/mark-read', markReadNotif);

export default router;