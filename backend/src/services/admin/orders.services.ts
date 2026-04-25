// services/rating.service.ts
import { prisma } from "../../lib/prisma";
import { OrderStatus } from "../../validators/user/order.validators";
import { getIO } from "../../lib/socket.lib";


export const getOrdersStatistics = async () => {
      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);

      const [
            total,
            today,
            pending,
            processing,
            in_transit,
            delivered,
            cancelled
      ] = await prisma.$transaction([
            prisma.orders.count({
                  where: {
                        status: {
                              not: "Cancelled"
                        }
                  }
            }),
            prisma.orders.count({
                  where: {
                        created_at: {
                              gte: todayStart
                        }
                  }
            }),
            prisma.orders.count({ where: { status: "Pending" } }),
            prisma.orders.count({ where: { status: "Processing" }}),
            prisma.orders.count({ where: { status: "In_Transit" }}),
            prisma.orders.count({ where: { status: "Delivered" }}),
            prisma.orders.count({ where: { status: "Cancelled" }})
      ]);

      return {
            total,
            today,
            pending,
            processing,
            in_transit,
            delivered,
            cancelled
      };
};

export const getOrders = async (status: OrderStatus, search?: string) => {
      return await prisma.orders.findMany({
            where: {
                  ...(status !== 'All' && { status }),
                  ...(search ?  { 
                        order_items: {
                              some: {
                                    name: { contains: search, mode: "insensitive" } 
                              }
                        },
                  } : {})
            },
            select: {
                  user_id: true,
                  order_id: true,
                  order_date: true,
                  order_time: true,
                  status: true,
                  shipping_address: true,
                  special_instruction: true,
                  total_price: true,
                  payment_method: true,
                  promo_code: true,
                  date_completed: true,

                  order_items: {
                        select: {
                              product_id: true,
                              name: true,
                              quantity: true,
                              price: true
                        }
                  },
                  users: {                         // include user info
                        select: {
                              user_id: true,
                              username: true,
                              contact_num: true,
                        },
                  },
            },
            orderBy: {
                  order_id: "desc",
            },
      });
};

export const updateOrderStatus = async ( order_id: number, status: OrderStatus ) => {
      const result = await prisma.$transaction(async (tx) => {
            // 1. Update order
            const order = await tx.orders.update({
                  where: { order_id },
                  data: { status },
                  select: {
                        user_id: true,
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
                                    subtotal: true,
                                    delivery_fee: true,
                              },
                        },
                  },
            });

            // 2. Create notification (based on status)
            let message = "";

            switch (status) {
                  case "Processing":
                        message = `Your order #GWAPOKO${order.order_id} is now being processed by our team.`;
                  break;
                  case "In_Transit":
                        message = `Your order #GWAPOKO${order.order_id} is currently in transit and on its way to you.`;
                  break;
                  case "Delivered":
                        message = `Your order #GWAPOKO${order.order_id} has been successfully delivered. Thank you for your purchase!`;
                  break;
                  case "Cancelled":
                        message = `Your order #GWAPOKO${order.order_id} has been cancelled by our team. For more information, please contact support.`
                  break;
                  default:
                        return;
            }

            await tx.notifications.create({
                  data: {
                        user_id: order.user_id,
                        order_id: order_id,
                        notif_type: status != 'Cancelled' ? "order_update" : "order_cancelled",
                        target_role: "user",
                        is_read: false,
                        status,
                        message,
                  },
            });

            return order;
      });
      // 3. Emit socket OUTSIDE transaction (important)
      const io = getIO();
      io.to(`user_${result?.user_id}`).emit("order_status_update", result);

      return result;
};

export const removeSpecificOrder = async (orderId: number) => {
      return await prisma.orders.delete({
            where: {
                  order_id: orderId
            }
      });
};