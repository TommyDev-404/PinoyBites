import { z } from "zod";

// Zod schema for safety data check that is passed by frontend
export const AllOrdersSchema = z.object({
      search: z.string().optional(),
      status: z.enum(['Processing', 'In_Transit', 'Cancelled', 'Returned', 'Delivered', 'Pending', 'All']).default('All')
});

export const UpdateOrderSchema = z.object({
      order_id: z.coerce.number(),
      status: z.enum(['Processing', 'In_Transit', 'Cancelled', 'Returned', 'Delivered', 'Pending'])
});

export const RemoveOrderSchema = z.object({
      orderId: z.coerce.number(),
});

