import { prisma } from "../../lib/prisma";

export const getAllProducts = async(whereFilter: any, orderBy: any) => {
      return await prisma.products.findMany({
            where: whereFilter,
            select: {
                  product_id: true,
                  name: true,
                  description: true,
                  category: true,
                  is_new: true,
                  price: true,
                  avg_rating: true,
                  total_reviews: true,
                  image_url: true,
                  steps: true,
                  ingredients: true
            },
            orderBy: orderBy
      });
};    

export const countTotalProducts = async(whereFilter: any) => {
      return await prisma.products.count({ where: whereFilter });
};    

export const getFeaturedProducts = async() => {
      return await prisma.products.findMany({
            orderBy: [
                  { avg_rating: "desc" },
                  { total_reviews: "desc" } // tie-breaker
            ],
            take: 5, // top 5 products
      });
};    

export const addFavoriteProducts = async(userId: number, productId: number) => {
      return  await prisma.$transaction(async (prisma) => {
            const favorite = await prisma.favorites.create({
                  data: {
                        user_id: userId,
                  }
            });

            await prisma.favorite_items.create({
                  data: {
                        favorite_id: favorite.favorite_id,
                        product_id: productId,
                  }
            });
      });
};

export const toggleFavoriteProducts = async (userId: number, productId: number) => {
      return await prisma.$transaction(async (prisma) => {
            // 1. Ensure user has a favorites container
            let favorite = await prisma.favorites.findFirst({
                  where: { user_id: userId }
            });
      
            if (!favorite) { // create user favorites container if not exists 
                  favorite = await prisma.favorites.create({
                        data: { user_id: userId }
                  });
            }
      
            // 2. Check if the product is already favorited
            const existingItem = await prisma.favorite_items.findFirst({
                  where: {
                        favorite_id: favorite.favorite_id,
                        product_id: productId
                  }
            });
      
            // 3. Toggle logic
            if (existingItem) {
                  await prisma.favorite_items.delete({
                        where: {
                        favorite_item_id: existingItem.favorite_item_id
                        }
                  });
            
                  return "removed";
            } else {
                  await prisma.favorite_items.create({
                        data: {
                              favorite_id: favorite.favorite_id,
                              product_id: productId
                        }
                  });
            
                  return "added";
            }
      });
};

export const getUserFavoriteProducts = async (userId: number) => {
      const favorite = await prisma.favorites.findFirst({
            where: { user_id: userId },
                  include: {
                        favorite_items: {
                              include: {
                                    products: true
                              }
                        }
                  }
            });

      if (!favorite) return [];

      return favorite.favorite_items.map(item => item.products);
};