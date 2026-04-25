import { Router } from 'express';
import { protect } from '../../middleware/auth.middleware';
import { addLoyaltyTiers, allLoyaltyTiers, allPromoCodeIssued, promoSummaryCard, removeLoyaltyTier, updateLoyaltyTiers } from '../../controllers/admin/promo.controllers';

const router = Router();

router.get("/get-all/loyalty-tiers", allLoyaltyTiers);
router.get("/get-all/issued-promo", allPromoCodeIssued);
router.get("/get/statistics", promoSummaryCard);
router.post("/add/loyalty-tier", addLoyaltyTiers);
router.put("/update/loyalty-tier", updateLoyaltyTiers);
router.delete("/remove/loyalty-tier", removeLoyaltyTier);

export default router;