import { z } from "zod";

export const UpdateProductSchema = z.object({
      product_id: z.coerce.number(),
      name: z.string().optional(),                          // product name
      description: z.string().optional(),
      price: z.coerce.number().optional(),
      image_url: z.string().optional(),
      category: z.string().optional(),
      ingredients: z.array(z.any()).optional(),            // JSONB array
      steps: z.array(z.any()).optional()                   // JSONB array
});

export const RemoveProductSchema = z.object({
      product_id: z.coerce.number(),
});

export const AddProductSchema = z.object({
      name: z.string(),                          // product name
      description: z.string(),
      price: z.coerce.number(),
      image_url: z.string(),
      category: z.string(),
      ingredients: z.array(z.any()),            // JSONB array
      steps: z.array(z.any())                   // JSONB array
});

export type AddProductType = z.infer<typeof AddProductSchema>;
export type UpdateProductType = z.infer<typeof UpdateProductSchema>;