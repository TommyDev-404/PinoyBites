import { Request, Response } from "express";
import { createNewLoyaltyTiers, getAllIssuedPromoCodes, getAllLoyaltyTiers, getPromoSummaryCards, removeSelectedLoyaltyTier, updateCurrentLoyaltyTiers } from "../../services/admin/promo.services";
import { AddPromoTierSchema, PromoTierIDSchema, UpdatePromoTierSchema } from "../../validators/admin/promo.validators";

export const allLoyaltyTiers = async (req: Request, res: Response) => {
      try {
            const loyalty_tiers = await getAllLoyaltyTiers();

            res.status(200).json({
                  success: true,
                  loyalty_tiers
            });
      } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Failed to fetch all loyalty tiers." });
      }
};

export const addLoyaltyTiers = async (req: Request, res: Response) => {
      const parsed = AddPromoTierSchema.safeParse(req.body);
      if (!parsed.success) {
            return res.status(400).json({ message: "Invalid body", errors: parsed.error.issues });
      }

      const { 
            tier_name,
            required_spent,
            valid_days,
            discount
      } = parsed.data;

      try {
            const loyalty_tiers = await createNewLoyaltyTiers({
                  tier_name,
                  required_spent,
                  valid_days,
                  discount
            });

            res.status(200).json({
                  success: true,
                  message: "Added successfully!",
                  loyalty_tier: loyalty_tiers
            });
      } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Failed to add loyalty tiers." });
      }
};

export const updateLoyaltyTiers = async (req: Request, res: Response) => {

      const queryParse = PromoTierIDSchema.safeParse(req.query);
      if (!queryParse.success) {
            return res.status(400).json({ message: "Invalid query", errors: queryParse.error.issues });
      }

      const bodyParsed = UpdatePromoTierSchema.safeParse(req.body);
      if (!bodyParsed.success) {
            return res.status(400).json({ message: "Invalid body", errors: bodyParsed.error.issues });
      }

      const tierId = queryParse.data.tier_id;
      const updatedTierData = bodyParsed.data;

      try {
            const loyalty_tiers = await updateCurrentLoyaltyTiers(tierId, updatedTierData);

            res.status(200).json({
                  success: true,
                  message: "Updated successfully!",
                  loyalty_tier: loyalty_tiers
            });
      } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Failed to update loyalty tiers." });
      }
};

export const removeLoyaltyTier = async (req: Request, res: Response) => {
      const queryParse = PromoTierIDSchema.safeParse(req.query);
      if (!queryParse.success) {
            return res.status(400).json({ message: "Invalid query", errors: queryParse.error.issues });
      }

      const { tier_id } = queryParse.data;

      try {
            const loyalty_tiers = await removeSelectedLoyaltyTier(tier_id);

            res.status(200).json({
                  success: true,
                  message: "Remove successfully!",
                  loyalty_tier: loyalty_tiers
            });
      } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Failed to update loyalty tiers." });
      }
};

export const allPromoCodeIssued = async (req: Request, res: Response) => {
      try {
            const promo_codes = await getAllIssuedPromoCodes();

            res.status(200).json({
                  success: true,
                  message: 'All issued promo retrieve successfully!',
                  promo_codes
            });
      } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Failed to fetch all promo codes." });
      }
};

export const promoSummaryCard = async (req: Request, res: Response) => {
      try {
            const summarryCard = await getPromoSummaryCards();

            res.status(200).json({
                  success: true,
                  message: 'Statistics retrieve successfully!',
                  statistics: {
                        active_promo: summarryCard.activePromo,
                        promo_issued: summarryCard.totalPromosIssued,
                        loyalty_tiers: summarryCard.totalLoyaltyTiers
                  }
            });
      } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Failed to fetch promo summarry card." });
      }
};