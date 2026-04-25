import { Router } from 'express';
import { accountInfoController } from '../controllers/account-info.controllers';

const router = Router();

router.get("/get", accountInfoController);

export default router;