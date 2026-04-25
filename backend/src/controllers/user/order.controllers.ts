import { Request, Response } from "express";
import { prisma } from "../../lib/prisma"; // adjust path
import { 
      PlaceOrderSchema, 
      CancelOrderSchema,
      CheckUserFeedback,
      GetOrderSchema,
      SubmitUserFeedback,
} from "../../validators/user/order.validators";
import { cancelCustomersOrders, checkIfUserDoneGiveFeedback, getCustomersOrders, placeCustomerOrder, submitFeedbackService } from "../../services/user/order.services";
import { success } from "zod";


export const getOrders = async (req: Request, res: Response) => {
      const parsedData = GetOrderSchema.safeParse(req.query);

      if (!parsedData.success) {
            return res.status(400).json({ message: "Invalid query", errors: parsedData.error.issues });
      }

      const { user_id, status } = parsedData.data;

      try {
            const orders = await getCustomersOrders(user_id, status);
            res.status(200).json({
                  success: true,
                  message: "Orders retrieve successfully!",
                  orders
            });
      } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Failed to fetch orders" });
      }
};

export const placeOrder = async (req: Request, res: Response) => {
      const parsedResult = PlaceOrderSchema.safeParse(req.body);

      if (!parsedResult.success) {
            return res.status(400).json({ message: "Invalid request body", errors: parsedResult.error.issues });
      }

      const {
            user_id,
            shipping_address,
            order_date,
            order_time,
            special_instructions,
            total_price,
            payment_method,
            product_items
      } = parsedResult.data; // data from the parsed req.body which is checked if it matches what the backend expected

      try {
            await placeCustomerOrder({
                  user_id,
                  shipping_address,
                  order_date,
                  order_time,
                  special_instructions,
                  total_price,
                  payment_method,
                  product_items
            });

            res.status(200).json({ 
                  success: true,
                  message: 'Order placed successfully!'
            });
      } catch (err) {
            console.error("Failed to place order:", err);
            res.status(500).json({ message: "Failed to place order." });
      }
};

export const checkUserFeedback = async (req: Request, res: Response) => {
      const queryParse = CheckUserFeedback.safeParse(req.query);
      if (!queryParse.success) {
            return res.status(400).json({ message: "Invalid query", errors: queryParse.error.issues });
      }

      const { user_id } = queryParse.data;

      try {
            const doneGiveFeedback = await checkIfUserDoneGiveFeedback(user_id);
            
            res.status(200).json({
                  success: true,
                  message: doneGiveFeedback ? "User already give feedback." : "User not yet given feedback,",
                  is_reviewed: doneGiveFeedback
            });
      } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Failed to fetch orders" });
      }
};

export const cancelOrder = async (req: Request, res: Response) => {
      // Validate params
      const parsed = CancelOrderSchema.safeParse(req.query);
      if (!parsed.success) {
            return res.status(400).json({ message: "Invalid query", errors: parsed.error.issues });
      }

      const { user_id, order_id } = parsed.data;

      try {
            await cancelCustomersOrders(user_id, order_id);

            res.status(200).json({ 
                  success: true,
                  message: "Order cancelled successfully!" 
            });
      } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Failed to cancel order" });
      }
};

export const submitFeedback = async (req: Request, res: Response) => {
      // Validate params
      console.log(req.body)
      const parsed = SubmitUserFeedback.safeParse(req.body);
      if (!parsed.success) {
            return res.status(400).json({ message: "Invalid query", errors: parsed.error.issues });
      }

      const { user_id, rating, comment } = parsed.data;

      try {
            await submitFeedbackService({ user_id, rating, comment });

            res.status(200).json({ 
                  success: true,
                  message: "Feedback submitted successfully!" 
            });
      } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Failed to submit feedback." });
      }
};