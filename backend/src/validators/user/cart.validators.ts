import { z } from "zod";

// Zod schema for safety data check that is passed by frontend
export const CartSchema = z.object({
      user_id : z.coerce.number(),
      product_id: z.coerce.number(),
      quantity: z.coerce.number().min(1),
});

export const LoginSchema = z.object({
      email: z.string(),
      password: z.string()
});

export const RemoveCartSchema = z.object({
      user_id: z.coerce.number(),
      product_id: z.coerce.number(),
});

export const CartUserIDSchema = z.object({
      user_id: z.coerce.number()
});