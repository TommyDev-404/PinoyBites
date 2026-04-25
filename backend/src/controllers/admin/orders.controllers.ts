import { Request, Response } from "express";
import { AllOrdersSchema, RemoveOrderSchema, UpdateOrderSchema } from "../../validators/admin/orders.validators";
import { getOrders, getOrdersStatistics, removeSpecificOrder, updateOrderStatus } from "../../services/admin/orders.services";

export const allOrdersStatistics = async (req: Request, res: Response) => {
      try{
            const order_stats = await getOrdersStatistics();
            res.status(200).json({ 
                  success: true,
                  message: "Order statistics retrieve successfully!",
                  order_stats
            });
      }catch(err){
            console.error(err);
            res.status(500).json({ message: "Failed to retrieve order statistics." });
      }
};

export const allOrders = async (req: Request, res: Response) => {
      const parsed = AllOrdersSchema.safeParse(req.query);  
      
      if (!parsed.success) {
            return res.status(400).json({ message: "Invalid query", errors: parsed.error.issues });
      }

      const { status, search } = parsed.data;

      try{
            const orders = await getOrders(status, search);
            
            res.status(200).json({ 
                  success: true,
                  message: "All orders retrieve successfully!",
                  orders
            });
      }catch(err){
            console.error(err);
            res.status(500).json({ message: "Failed to retrieve all orders." });
      }
};

export const updateOrder = async (req: Request, res: Response) => {
      const parsed = UpdateOrderSchema.safeParse(req.query);
      if (!parsed.success) {
            return res.status(400).json({ message: "Invalid query", errors: parsed.error.issues });
      }

      const { order_id, status } = parsed.data;

      try{
            const updatedOrder = await updateOrderStatus(order_id, status);
            
            res.status(200).json({ 
                  success: true,
                  message: "Order status updated successfully!"
            });
      }catch(err){
            console.error(err);
            res.status(500).json({ message: "Failed to update order." });
      }
};

export const removeOrder = async (req: Request, res: Response) => {
      const parsed = RemoveOrderSchema.safeParse(req.query);
      if (!parsed.success) {
            return res.status(400).json({ message: "Invalid query", errors: parsed.error.issues });
      }

      const { orderId } = parsed.data;

      try{
            const removedOrder = await removeSpecificOrder(orderId);
            
            res.status(200).json({ 
                  success: true,
                  orders: removedOrder
            });
      }catch(err){
            console.error(err);
            res.status(500).json({ message: "Failed to remove order." });
      }
};
