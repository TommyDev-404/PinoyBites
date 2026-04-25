import { Router } from 'express';
import { protect } from '../../middleware/auth.middleware';
import { addProduct, allProducts, removeProduct, updateProducts, viewProduct } from '../../controllers/admin/products.controllers';

const router = Router();

router.get('/get-all', allProducts);
router.get('/view', viewProduct);
router.post('/add', addProduct);
router.put('/update', updateProducts);
router.delete('/remove', removeProduct);

export default router;