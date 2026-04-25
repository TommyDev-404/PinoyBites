import { prisma } from "../../lib/prisma";
import { getIO } from "../../lib/socket.lib";
import { ProductItemsInfo } from "../../validators/user/notifications.validators";

export const getAllUserNotification = async (userId: number) => {
      // 1. Fetch notifications
      return  await prisma.notifications.findMany({
            where: { user_id: userId },
            select: {
                  notif_id: true,
                  message: true,
                  is_read: true,
                  created_at: true,
                  notif_type: true,
                  status: true,
                  orders: {
                        select: {
                              order_id: true,
                        }
                  }
            },
            orderBy: {
                  created_at: 'desc'
            }
      });

};

export const markAllNotificationAsRead = async(userId: number) => {
      return  await prisma.notifications.updateMany({ // returns array
            where: { user_id: userId },
            data: { is_read: true }
      });
};

export const markSpecificNotificationAsRead = async(userId: number, notifId: number) => {
      return  await prisma.notifications.update({ // returns array
            where: { 
                  notif_id: notifId,
                  user_id: userId
            },
            data: { is_read: true }
      });
};

export const markProductRated = async (
      user_id: number,
      order_id: number,
      notif_id: number,
      products: ProductItemsInfo[]
) => {
      const review = await prisma.$transaction(async(tx) => {
            const updatedProducts = [];
      
            for (const item of products) {
                  // 1. Insert review
                  await tx.reviews.create({
                        data: {
                              user_id,
                              order_id,
                              type: 'product',
                              product_id: item.product_id,
                              rating: item.rating,
                              comment: item.comment,
                        },
                  });
            
                  // 2. Recalculate stats for this product
                  const stats = await tx.reviews.aggregate({
                        where: { product_id: item.product_id },
                        _avg: { rating: true },
                        _count: { rating: true },
                  });
            
                  // 3. Update product rating summary
                  const updatedProduct = await tx.products.update({
                        where: { product_id: item.product_id },
                        data: {
                              avg_rating: stats._avg.rating ?? 0,
                              total_reviews: stats._count.rating,
                        },
                  });
            
                  updatedProducts.push(updatedProduct);
            }
      
            return updatedProducts;
      });

      const io = getIO();

      io.to("admin").emit("new_feedback", review);
};

export const validateUserIfAlreadyRated = async (
      user_id: number,
      order_id: number,
) => {      
      return  await prisma.reviews.findFirst({
            where: {
                  user_id,
                  order_id
            }
      });
};

export const getOrderInfo = async (user_id: number, order_id: number) => {
      // Fetch order with items
      const order = await prisma.orders.findFirst({
            where: { user_id, order_id },
            select: {
                  order_id: true,
                  order_date: true,
                  status: true,
                  total_price: true,
                  order_items: {
                        select: {
                        product_id: true,
                        name: true,
                        image_url: true,
                        quantity: true,
                        price: true,
                        },
                  },
            },
      });

      if (!order) return null;

      //  Fetch reviews for this user for this order
      const reviews = await prisma.reviews.findMany({
            where: { user_id, order_id },
            select: { product_id: true, rating: true },
      });

      //  Make a quick lookup map
      const reviewMap = new Map<number, number>(); // product_id -> rating
      reviews.forEach(r => reviewMap.set(r.product_id!, r.rating.toNumber()));

      // Attach is_rated and rating to each item
      const updatedItems = order.order_items.map(item => ({
            ...item,
            is_rated: reviewMap.has(item.product_id),
            rating: reviewMap.get(item.product_id) ?? 0,
      }));

      return {
            ...order,
            order_items: updatedItems,
      };
};
