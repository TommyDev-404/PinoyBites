import { prisma } from "../../lib/prisma";
import { setExpiryDate } from "../../utils/date.util";
import { PaymentMethod, OrderStatus, OrderBody, FeedbackBody } from "../../validators/user/order.validators";
import { getIO } from "../../lib/socket.lib";
import { checkUserPromoEligibility } from "./cart.services";

export const getCustomersOrders = async (user_id: number, status: OrderStatus) => {
      return await prisma.orders.findMany({ // returns array
            where: {
                  user_id,
                  ...(status && status !== "All" ? { status } : {})
            },
            select:{
                  order_id: true,
                  order_date: true,
                  status: true,
                  total_price: true,
                  
                  order_items: {
                        select: {
                              name: true,
                              product_id: true,
                              image_url: true,
                              quantity: true,
                              price: true,
                              subtotal: true,
                              delivery_fee: true
                        }
                  }
            },
            orderBy: {
                  order_id: 'desc'
            }
      });
};

export const placeCustomerOrder = async (data: OrderBody) => {
      const result = await prisma.$transaction(async (tx) => {
            // Create order
            const createdOrder = await tx.orders.create({
                  data: {
                        user_id: data.user_id,
                        order_date: data.order_date,
                        order_time: data.order_time,
                        shipping_address: data.shipping_address,
                        special_instruction: data.special_instructions,
                        status: "Pending",
                        total_price: data.total_price,
                        payment_method: data.payment_method as PaymentMethod,
                  },
            });
      
            // Create order items
            await tx.order_items.createMany({
                  data: data.product_items.map(item => ({
                        order_id: createdOrder.order_id,
                        product_id: item.product_id,
                        name: item.name,
                        image_url: item.image_url || "",
                        price: item.price,
                        quantity: item.quantity,
                        subtotal: item.subtotal,
                        delivery_fee: item.delivery_fee,
                        created_at: new Date()
                  })),
            });
      
            // Fetch full order with items
            const fullOrder = await tx.orders.findUnique({
                  where: { order_id: createdOrder.order_id },
                  select: {
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
            });

            if (!fullOrder) {
                  throw new Error("Order not found after creation");
            }
            
            // Create notification for order
            await tx.notifications.createMany({
                  data: [
                        {
                              user_id: data.user_id,
                              order_id: createdOrder.order_id,
                              target_role: 'user',
                              notif_type: "new_order",
                              is_read: false,
                              status: 'Pending',
                              message: `Your order #ORDR-GWAPOKO${fullOrder?.order_id} has been successfully placed!`,
                        },
                        {
                              user_id: null,
                              order_id: createdOrder.order_id,
                              target_role: 'admin',
                              notif_type: "new_order",
                              is_read: false,
                              message: `New order received: #ORDR-GWAPOKO${fullOrder?.order_id}`,
                        }
                  ]
            });

            const newTiers = await checkUserPromoEligibility(data.user_id);
            
            // apply the new promo or the promo for fist time having a promo based on total spent
            for (const tier of newTiers) {
                  await tx.user_promos.create({
                        data: {
                              user_id: data.user_id,
                              tier_id: tier.id,
                              discount: tier.discount,
                              expires_at: setExpiryDate(new Date(), tier.valid_days),
                              created_at: new Date()
                        }
                  });

                  await tx.notifications.create({
                        data: {
                              user_id: data.user_id,
                              notif_type: "promo",
                              target_role: 'user',
                              is_read: false,
                              status: 'Pending',
                              message: `🎉 Congrats! You just reached ${tier.tier_name} and earned a ${tier.discount}% discount. Use your promo within ${tier.valid_days} days.`
                        }
                  });
            }
            
            // remove the cart after order placed
            await tx.carts.deleteMany({
                  where: {
                        user_id: data.user_id,
                  }
            });
            
            // Fetch the created notifications for this order
            const createdNotifs = await tx.notifications.findMany({
                  where: { order_id: createdOrder.order_id },
                  orderBy: { notif_id: 'desc' }, // optional: maintain creation order
            });


            return {
                  fullOrder,
                  createdNotifs
            };
      });

      const io = getIO();

      io.to("admin").emit("new_order", result.fullOrder);
      io.to("admin").emit("new_notification", result.createdNotifs.filter(n => n.target_role === 'admin'));

      return result;
};

export const cancelCustomersOrders = async (user_id: number, order_id: number) => {
      const result =  await prisma.$transaction(async(tx) => {
            const updatedOrder = await prisma.orders.update({
                  where: { order_id, user_id, status: { not: "Cancelled" } },
                  data: { status: "Cancelled" },
            });

            await tx.notifications.createMany({
                  data: [
                        {
                              user_id: user_id,
                              order_id: updatedOrder.order_id,
                              notif_type: "order_cancelled",
                              target_role: 'user',
                              is_read: false,
                              message: `Your order #ORDR-GWAPOKO${updatedOrder.order_id} has been cancelled.`
                        },
                        {
                              user_id: null,
                              order_id: updatedOrder.order_id,
                              notif_type: "order_cancelled",
                              target_role: 'admin',
                              is_read: false,
                              message: `Order cancelled: #ORDR-GWAPOKO${updatedOrder?.order_id}`
                        }
                  ]
            });

            const createdNotifs = await tx.notifications.findMany({
                  where: { order_id: order_id, target_role: 'admin' },
                  orderBy: { notif_id: 'asc' }, // optional: maintain creation order
            });

            const fullOrder = await tx.orders.findUnique({
                  where: { order_id: updatedOrder.order_id },
                  select: {
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
            });

            return {
                  createdNotifs, 
                  fullOrder
            };
      });
      
      const io = getIO();
      
      io.to("admin").emit("new_notification", result.createdNotifs);
      io.to("admin").emit("cancelled_order", result.fullOrder);

      return result;
};

export const checkIfUserDoneGiveFeedback = async (user_id: number) => {
      const userAlreadyRated = await prisma.reviews.findFirst({
            where: { user_id }
      });
      return userAlreadyRated ? true : false;
};

export const submitFeedbackService = async (data: FeedbackBody) => {
      const feedback = await prisma.$transaction(async (tx) => {
            const createdFeedback = await tx.reviews.create({
                  data: {
                        user_id: data.user_id,
                        rating: data.rating,
                        comment: data.comment,
                        type: 'system'
                  }
            });

            await tx.notifications.create({
                  data: {
                        user_id: data.user_id,
                        notif_type: "review",
                        target_role: "user",
                        is_read: false,
                        message: "⭐ Thank you for your feedback! We appreciate your time and effort in helping us improve."
                  }
            });

            return createdFeedback;
      });
      const io = getIO();

      io.to("admin").emit("new_feedback", feedback);
};



