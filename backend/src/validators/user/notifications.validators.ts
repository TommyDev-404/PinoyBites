import { z } from "zod";

// Zod schema for safety data check that is passed by frontend
export const UserIDNotificationSchema = z.object({
      user_id: z.coerce.number(),
});

export const MarkReadNotificationSchema = z.object({
      user_id: z.coerce.number(),
      notif_id: z.coerce.number().optional()
});

export const RateProductsSchema = z.object({
      user_id: z.coerce.number(),
      order_id: z.coerce.number(),
      notif_id: z.coerce.number(),
      products: z.array(z.object({
            product_id: z.coerce.number(),
            rating: z.coerce.number().min(1).max(5),
            comment: z.string()
      }))
});

export const CheckIfRatedSchema = z.object({
      user_id: z.coerce.number(),
      order_id: z.coerce.number(),
});

export const ViewOrderInfoSchema = z.object({
      user_id: z.coerce.number(),
      order_id: z.coerce.number(),
});


export type ProductItemsInfo = {
      product_id: number,
      rating: number,
      comment: string
}