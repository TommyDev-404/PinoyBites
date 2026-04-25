import { Request, Response } from "express";
import { banCustomer, getAllCustomersInfo, getCustomersOrderHistory, getCustomerStatistics, unbanCustomer } from "../../services/admin/customer.services";
import { BanCustomerSchema, CustomerIdSchema, UnBanCustomerSchema } from "../../validators/admin/customer.validators";

export const allCustomersStatistics = async (req: Request, res: Response) => {
      try {
            const statistics = await getCustomerStatistics();

            res.status(200).json({
                  success: true,
                  message: 'Customers statistics retrieve successfully!',
                  statistics
            });
      } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Failed to fetch all customers." });
      }
};

export const allCustomers = async (req: Request, res: Response) => {
      try {
            const customers = await getAllCustomersInfo();

            res.status(200).json({
                  success: true,
                  message: 'All customers retrieve successfully!',
                  customers
            });
      } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Failed to fetch all customers." });
      }
};

export const customerOrderHistory = async (req: Request, res: Response) => {
      const parsed = CustomerIdSchema.safeParse(req.query);
      if (!parsed.success) {
            return res.status(400).json({ message: "Invalid query", errors: parsed.error.issues });
      }

      const { user_id } = parsed.data;

      try {
            const orders = await getCustomersOrderHistory(user_id);

            res.status(200).json({
                  success: true,
                  message: 'All customer order history retrieve successfully!',
                  orders
            });
      } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Failed to fetch all order history." });
      }
};

export const banCustomerController = async (req: Request, res: Response) => {
      const parsedQuery = CustomerIdSchema.safeParse(req.query);
      if (!parsedQuery.success) {
            return res.status(400).json({ message: "Invalid request", errors: parsedQuery.error.issues });
      }

      const parsed = BanCustomerSchema.safeParse(req.body);
      if (!parsed.success) {
            return res.status(400).json({ message: "Invalid request", errors: parsed.error.issues });
      }

      const { user_id } = parsedQuery.data;
      const { reason, duration } = parsed.data;

      try {
            const ban = await banCustomer(user_id, reason, duration);

            res.status(200).json({
                  success: true,
                  message: `Customer banned successfully for ${duration} day(s).`
            });
      } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Failed to ban customer." });
      }
};

export const unbanCustomerController = async (req: Request, res: Response) => {
      const parsed = CustomerIdSchema.safeParse(req.query);
      if (!parsed.success) {
            return res.status(400).json({ message: "Invalid request", errors: parsed.error.issues });
      }

      const parsedBody = UnBanCustomerSchema.safeParse(req.body);
      if (!parsedBody.success) {
            return res.status(400).json({ message: "Invalid request", errors: parsedBody.error.issues });
      }

      const { user_id } = parsed.data;
      const { reason } = parsedBody.data;

      try {
            const result = await unbanCustomer(user_id, reason);

            res.status(200).json({
                  success: true,
                  message: "Customer has been unbanned successfully."
            });
      } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Failed to unban customer." });
      }
};