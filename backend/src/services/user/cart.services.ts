import { prisma } from "../../lib/prisma";


export const findUserCartItems = async(user_id: number) => {
      return prisma.cart_items.findMany({
            where: { 
                  carts: { user_id: Number(user_id) }
            },
            select: {
                  cart_id: true,
                  quantity: true,
                  created_at: true,

                  products: {
                        select: {
                              product_id: true,
                              name: true,
                              price: true,
                              image_url: true,
                              description: true,
                              category: true
                        }
                  }
            },
            orderBy: {
                  created_at: 'desc' // order by created_at in descending order
            }
      });
};   

export const addUserCartItems = async(user_id: number, product_id: number, quantity: number) => {
      return prisma.$transaction(async (prisma) => {
            // find existing cart for the user
            let cart =  await prisma.carts.findFirst({
                  where: { user_id }
            });

            // create cart if not exists
            if (!cart) {
                  cart = await prisma.carts.create({
                        data: { user_id }
                  });
            }

            const existingCartItems = await prisma.cart_items.findFirst({
                  where: {
                        cart_id: cart.cart_id,
                        product_id
                  }
            });

            if (existingCartItems) {
                  // update quantity if item already exists in cart
                  return await prisma.cart_items.update({
                        where: { cart_item_id: existingCartItems.cart_item_id },
                        data: { quantity: existingCartItems.quantity + quantity }
                  });
            } else {
                  // add new item to cart
                  return await prisma.cart_items.create({
                        data: {
                              cart_id: cart.cart_id,
                              product_id,
                              quantity: quantity,
                              created_at: new Date() // set created_at to current timestamp
                        }
                  });
            }

      });
};    

export const updateUserCartItems = async(user_id: number, product_id: number, quantity: number) => {
      return prisma.$transaction(async (prisma) => {
            const cart = await prisma.carts.findFirst({
                  where: { user_id }
            });

            if (!cart) throw new Error("Cart not found");

            const existingCartItems = await prisma.cart_items.findFirst({
                  where: {
                        cart_id: cart.cart_id,
                        product_id
                  }
            });

            if (!existingCartItems) throw new Error("Cart item not found");

            return await prisma.cart_items.update({
                  where: { cart_item_id: existingCartItems.cart_item_id },
                  data: { quantity: quantity }
            });
      });
};

export const removeItemFromUserCart = async(user_id: number, product_id: number) => {
      return await prisma.$transaction(async (prisma) => {
            const cart = await prisma.carts.findFirst({
                  where: { user_id }
            });

            if (!cart) throw new Error("Cart not found");

            await prisma.cart_items.deleteMany({
                  where: {
                        cart_id: cart.cart_id,      // ensures it’s the correct cart
                        product_id // ensures it’s the correct product
                  }
            });
      });
}; 

export const checkUserPromoEligibility = async(user_id: number) => {
      const userTotalSpent = await prisma.orders.aggregate({
            where: { user_id: user_id },
            _sum: { total_price: true }
      });

      const totalSpent = userTotalSpent._sum.total_price ?? 0;
      
      const eligibleTiers = await prisma.loyalty_tiers.findMany({
            where: {
                  required_spent: {
                        lte: totalSpent
                  }
            },
            orderBy: {
                  required_spent: 'asc'
            }
      });

      // get all the valid promo for that user
      const existingPromos = await prisma.user_promos.findMany({
            where: { user_id: user_id },
            select: { tier_id: true }
      });
      
      // get the id of that promo
      const existingTierIds = existingPromos.map(p => p.tier_id);

      // check if the user already have that promo but they reach another level of promo
      // apply only the new promo not the old one
      // (e.g) A user have reach 1000 which is for 2nd level promo, and he already get the 1st level promo, so it will give only the new promo and avoid applying the old one
      const newTiers = eligibleTiers.filter(tier => !existingTierIds.includes(tier.id));

      return newTiers;
}; 
