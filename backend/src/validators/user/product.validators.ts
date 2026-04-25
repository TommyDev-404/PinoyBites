import { z } from "zod";

export const ProductSchema = z.object({
      searchProduct: z.string().optional().default(""),
      selectedCategory: z.string().optional().default("All"),
      sortBy: z.enum(["price-low", "price-high", "new", "rating", "recommended"]).optional().default("new"),
      minPrice: z.coerce.number().optional().default(1),
      maxPrice: z.coerce.number().optional().default(100),
});

export const AddFavoriteProductSchema = z.object({
      userId: z.coerce.number(),
      productId: z.coerce.number(),
});

export const GetFavoriteProductSchema = z.object({
      userId: z.coerce.number()
});