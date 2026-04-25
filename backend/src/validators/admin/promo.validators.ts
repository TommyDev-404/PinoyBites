import { z } from "zod";

export const PromoTierIDSchema = z.object({
      tier_id: z.coerce.number()
});

export const UpdatePromoTierSchema = z.object({
      tier_name: z.string().optional(),
      required_spent: z.coerce.number().optional(),
      valid_days: z.coerce.number().optional(),
      discount: z.coerce.number().optional()
});

export const AddPromoTierSchema = z.object({
      tier_name: z.string(),
      required_spent: z.coerce.number(),
      valid_days: z.coerce.number(),
      discount: z.coerce.number()
});

export type AddPromoTierType = z.infer<typeof AddPromoTierSchema>;
export type UpdatePromoTierType = z.infer<typeof UpdatePromoTierSchema>;