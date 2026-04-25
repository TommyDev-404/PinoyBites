import { Request, Response } from "express";
import { RateProductsSchema, MarkReadNotificationSchema, UserIDNotificationSchema, CheckIfRatedSchema, ViewOrderInfoSchema } from "../../validators/user/notifications.validators";
import { getAllUserNotification, getOrderInfo, markAllNotificationAsRead, markProductRated, markSpecificNotificationAsRead, validateUserIfAlreadyRated } from "../../services/user/notification.services";
import { success } from "zod";

export const getAllNotifications = async (req: Request, res: Response) => {
      // 1. Validate route params
      const parsed = UserIDNotificationSchema.safeParse(req.query);
      if (!parsed.success) {
            return res.status(400).json({ message: "Invalid query.", errors: parsed.error.issues });
      }

      const { user_id } = parsed.data;

      try {
            const notifications = await getAllUserNotification(user_id);
            res.status(200).json({
                  success: true,
                  message: "Notifications retrieved successfully!",
                  notifications
            });
      } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Failed to fetch user notifications." });
      }
};

export const markAllAsRead = async (req: Request, res: Response) => {
      // 1. Validate route params
      const parsed = MarkReadNotificationSchema.safeParse(req.query);
      if (!parsed.success) {
            return res.status(400).json({ message: "Invalid query", errors: parsed.error.issues });
      }

      const { user_id } = parsed.data;

      try {
            const notification = await markAllNotificationAsRead(user_id);
            res.status(200).json(notification);
      } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Failed to mark all notification as read." });
      }
};

export const markIndividualAsRead = async (req: Request, res: Response) => {
      const parsed = MarkReadNotificationSchema.safeParse(req.query);
      if (!parsed.success) {
            return res.status(400).json({ message: "Invalid query", errors: parsed.error.issues });
      }

      const { user_id, notif_id } = parsed.data;

      try {
            await markSpecificNotificationAsRead(user_id, notif_id!);

            res.status(200).json({
                  success: true,
                  message: "Notification marked as read",
            });
      } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Failed to mark notification as read." });
      }
};

export const rateProducts = async (req: Request, res: Response) => {
      // Validate data received
      const parsed = RateProductsSchema.safeParse(req.body);
      if (!parsed.success) {
            return res.status(400).json({ message: "Invalid body", errors: parsed.error.issues });
      }

      const { 
            user_id, 
            order_id, 
            notif_id,
            products
      } = parsed.data;

      try {
            await markProductRated(
                  user_id, 
                  order_id, 
                  notif_id,
                  products
            );
            
            res.status(200).json({
                  success: true,
                  message: "Rating submitted successfully",
            });
      } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Failed to submit rating" });
      }
};

export const checkUserIfRated = async (req: Request, res: Response) => {
      // Validate data received
      const parsed = CheckIfRatedSchema.safeParse(req.body);
      if (!parsed.success) {
            return res.status(400).json({ message: "Invalid params", errors: parsed.error.issues });
      }

      const { 
            user_id, 
            order_id
      } = parsed.data;

      try {
            const ratedProducts = await validateUserIfAlreadyRated(
                  user_id, 
                  order_id
            );
            
            if (ratedProducts) {
                  return res.status(200).json({
                        success: true,
                        message: "User has already rated this product",
                        data: {
                              done_rated: true
                        }
                  });
            }

            res.status(200).json({
                  success: true,
                  message: "User has not rated this product",
                  data: {
                        done_rated: false
                  }
            });
      } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Failed to submit rating" });
      }
};

export const viewUserOrderInfo = async (req: Request, res: Response) => {
      // Validate data received
      const parsed = ViewOrderInfoSchema.safeParse(req.query);
      if (!parsed.success) {
            return res.status(400).json({ message: "Invalid params", errors: parsed.error.issues });
      }

      const { 
            user_id, 
            order_id
      } = parsed.data;

      try {
            const orders = await getOrderInfo(
                  user_id, 
                  order_id
            );

            res.status(200).json({
                  success: true,
                  message: "Orders successfully retrieved.",
                  orders
            });
      } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Failed to submit rating" });
      }
};

