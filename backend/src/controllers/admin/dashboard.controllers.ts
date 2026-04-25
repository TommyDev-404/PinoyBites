import { Request, Response } from "express";
import { getDashboardSummaryCards, getOrderStatusDistribution, getRecentOrders, getTopCustomers, getTopSellingProducts } from "../../services/admin/dashboard.services";

export const dashboardSummaryCards = async (req: Request, res: Response) => {
      try {
            const data = await getDashboardSummaryCards();

            res.status(200).json({
                  success: true,
                  message: "Dashboard statistics retreived successfully!",
                  statistics: {
                        total_orders: data.totalOrder,
                        today_orders: data.todayOrder,
                        pending_order: data.pendingOrder,
                        total_revenue: data.totalRevenue,
                        total_products: data.totalProducts
                  }
            });
      } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Failed to fetch dashboard summary data." });
      }
};

export const recentOrders = async (req: Request, res: Response) => {
      try {
            const recent_orders = await getRecentOrders();
            
            res.status(200).json({
                  success: true,
                  message: "Recent orders retrieve successfully!",
                  recent_orders
            });
      } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Failed to fetch recentOrders." });
      }
};

export const orderStatusDistribution = async (req: Request, res: Response) => {
      try {
            const status = await getOrderStatusDistribution();

            res.status(200).json({
                  success: true,
                  message: "Order status distribution retrieve successfully!",
                  status
            });
      } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Failed to fetch order status distribution." });
      }
};

export const topSellingProducts = async (req: Request, res: Response) => {
      try {
            const products = await getTopSellingProducts();

            res.status(200).json({
                  success: true,
                  message: "Top selling products retreived successfully!",
                  products
            });
      } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Failed to fetch top selling products." });
      }
};

export const topCustomers = async (req: Request, res: Response) => {
      try {
            const customers = await getTopCustomers();

            res.status(200).json({
                  success: true,
                  message: "Top customers retreived successfully!",
                  customers
            });
      } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Failed to fetch all customers." });
      }
};
