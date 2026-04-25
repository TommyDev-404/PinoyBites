import { z } from "zod";

// Zod schema for safety data check that is passed by frontend
export const ProductItemSchema = z.object({
      product_id: z.coerce.number(),
      name: z.string(),
      image_url: z.string(),
      price: z.coerce.number(),
      quantity: z.coerce.number().min(1),
      subtotal: z.coerce.number(),
      delivery_fee: z.coerce.number()
});

export const PlaceOrderSchema = z.object({
      user_id: z.coerce.number(),
      shipping_address: z.string(),
      order_date: z.coerce.date(),
      order_time: z.string(),
      special_instructions: z.string(),
      total_price: z.coerce.number(),
      payment_method: z.enum(['Gcash', 'COD' ]),
      product_items: z.array(ProductItemSchema)
});

export const CheckUserFeedback = z.object({
      user_id: z.coerce.number()
});

export const SubmitUserFeedback = z.object({
      user_id: z.coerce.number(),
      rating: z.coerce.number(),
      comment: z.string()
});

// Type inferred from schema
export type FeedbackBody = z.infer<typeof SubmitUserFeedback>;
export type OrderBody = z.infer<typeof PlaceOrderSchema>;
export type PaymentMethod = 'Gcash' | 'COD' 
export type OrderStatus = 'Processing' | 'In_Transit' | 'Cancelled' | 'Returned' | 'Delivered' | 'Pending' | 'All'

// Params schema
export const GetOrderSchema = z.object({
      user_id: z.coerce.number(), // coerce string -> number
      status: z.enum(['Processing', 'In_Transit', 'Cancelled', 'Returned', 'Delivered', 'Pending', 'All']).default('All'), // optional filter
});

// Cancel order schema
export const CancelOrderSchema = z.object({
      user_id: z.coerce.number(),
      order_id: z.coerce.number()
});

