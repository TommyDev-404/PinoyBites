import { Request, Response } from "express";
import { AddFavoriteProductSchema, GetFavoriteProductSchema, ProductSchema } from "../../validators/user/product.validators";
import { countTotalProducts, getAllProducts, getFeaturedProducts, getUserFavoriteProducts, toggleFavoriteProducts } from "../../services/user/product.services";


export const allProducts = async (req: Request, res: Response) => {
      const parsed = ProductSchema.safeParse(req.query);

      if (!parsed.success) {
            return res.status(400).json({ message: "Invalid params", errors: parsed.error.issues });
      }

      const {
            searchProduct,
            selectedCategory,
            sortBy,
            minPrice,
            maxPrice,
      } = parsed.data;

      try {

            // 2. Build Prisma 'where' filter
            const whereFilter: any = {
                  AND: [
                        { name: { contains: searchProduct, mode: "insensitive" } },
                        selectedCategory !== "All" ? { category: selectedCategory } : {},
                        { price: { gte: minPrice, lte: maxPrice } },
                  ],
            };

            // 3. Build Prisma 'orderBy' filter
            let orderBy: any = {};
            switch (sortBy) {
                  case "price-low":
                        orderBy = { price: "asc" };
                  break;
                  case "price-high":
                        orderBy = { price: "desc" };
                  break;
                  case "new":
                        orderBy = { is_new: "desc" };
                  break;
                  case "rating":
                        orderBy = { avg_rating: "desc" };
                  break;
                  case "recommended":
                  default:
                        // recommended = avg_rating * total_reviews desc
                        orderBy = { avg_rating: "desc" }; // we can sort only by single field in Prisma
                        break;
            }

            // 4. Fetch products from Prisma with pagination
            const products = await getAllProducts(whereFilter, orderBy);

            // 5. Optionally get total count for pagination
            const totalProducts = await countTotalProducts(whereFilter);

            // 6. Send response
            res.status(200).json({
                  success: true, 
                  message: 'All products retrieve successfully!',
                  products
            });

      } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Failed to fetch products" });
      }
};

export const featuredProducts = async (req: Request, res: Response) => {
      try {
            // Fetch top 5 featured products based on rating and total reviews
            const featuredProducts = await getFeaturedProducts();
            res.status(200).json(featuredProducts);
      } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Failed to fetch featured products" });
      }
};

export const toggleUserFavoriteProducts = async (req: Request, res: Response) => {
      const parsed = AddFavoriteProductSchema.safeParse(req.body);

      if (!parsed.success) {
            return res.status(400).json({ message: "Invalid query", errors: parsed.error.issues });
      }

      const { userId, productId} = parsed.data;

      try {
            const result = await toggleFavoriteProducts(userId, productId);
            res.status(200).json({
                  success: true,
                  message: result === 'added' ? "Item added in favorites" :  "Item removed in favorites" 
            });
      } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Failed to toggle product to favorites" });
      }
};

export const userFavoriteProducts = async (req: Request, res: Response) => {
      const parsed = GetFavoriteProductSchema.safeParse(req.query);
      if (!parsed.success) {
            return res.status(400).json({ message: "Invalid params", errors: parsed.error.issues });
      }

      const { userId } = parsed.data;

      try {
            const favoriteProducts = await getUserFavoriteProducts(userId);
            res.status(200).json(favoriteProducts);
      } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Failed to fetch favorite products" });
      }
};    
