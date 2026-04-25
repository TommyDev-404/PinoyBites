// services/rating.service.ts
import { gte } from "zod";
import { prisma } from "../../lib/prisma";
import { AddPromoTierType, UpdatePromoTierType } from "../../validators/admin/promo.validators";

export const getAllLoyaltyTiers = async () => {
      return await prisma.loyalty_tiers.findMany({
            select: {
                  id: true,
                  tier_name: true,
                  required_spent: true,
                  discount: true,
                  valid_days: true,
                  created_at: true
            },
            orderBy: { required_spent: 'asc' }
      });
};

export const createNewLoyaltyTiers = async (tierData: AddPromoTierType) => {
      return await prisma.loyalty_tiers.create({
            data: {
                  ...tierData
            },
      });
};

export const updateCurrentLoyaltyTiers = async (tier_id: number, updatedData: UpdatePromoTierType) => {
      return await prisma.$transaction(async (tx) => {
            // 1. Update the loyalty tier
            const updatedTier = await tx.loyalty_tiers.update({
                  where: { id: tier_id },
                  data: updatedData,
            });

            // 2. If valid_days changed, update issued promo expiries
            if (updatedData.valid_days !== undefined) {
                  await tx.user_promos.updateMany({
                        where: { tier_id: tier_id }, // only active promos
                        data: {
                              expires_at: new Date(new Date().getTime() + updatedData.valid_days * 24 * 60 * 60 * 1000)
                        },
                  });
            }

            return updatedTier;
      });
};

export const removeSelectedLoyaltyTier = async (tier_id: number,) => {
      return await prisma.loyalty_tiers.delete({
            where: { id: tier_id }
      });
};

export const getAllIssuedPromoCodes = async () => {
      return await prisma.user_promos.findMany({
            select: {
                  id: true,
                  discount: true,
                  expires_at: true,
                  created_at: true,
                  
                  loyalty_tiers: {
                        select: { tier_name: true }
                  },
                  users: {
                        select: { username: true }
                  }
            }
      });
};

export const getPromoSummaryCards = async () => {
      return await prisma.$transaction(async(tx) => {
            const activePromo = await tx.user_promos.aggregate({
                  where: { 
                        expires_at: {
                              gte: new Date() 
                        }
                  },
                  _count: { expires_at: true }
            });

            const totalPromosIssued = await tx.user_promos.aggregate({
                  _count: { id: true }
            });

            const totalLoyaltyTiers = await tx.loyalty_tiers.aggregate({
                  _count: { id: true }
            });

            return {
                  activePromo: activePromo._count.expires_at,
                  totalPromosIssued: totalPromosIssued._count.id,
                  totalLoyaltyTiers: totalLoyaltyTiers._count.id
            };
      });
};



