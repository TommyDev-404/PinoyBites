import { z } from "zod";

export const CustomerIdSchema = z.object({
      user_id: z.coerce.number()
});

export  const BanCustomerSchema = z.object({
      reason: z.string(),
      duration: z.number().min(1)
});

export  const UnBanCustomerSchema = z.object({
      reason: z.string(),
});

