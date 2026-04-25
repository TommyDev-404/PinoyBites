import type { OrderStatus } from "../user/order.types"


export type DashboardStatistics = {
      total_orders: number,
      today_orders: number,
      pending_order: number,
      total_revenue: number,
      total_products: number
}

export type RecentOrdersInfo = {
      order_id: number,
      order_date: Date,
      total_price: number,
      status: OrderStatus,
      users: {
            username: string
      }
}

export type OrderStatusDistributionType = {
      order_status: OrderStatus,
      count: number,
      percentage: number
}

export type TopSellingProducts = {
      product_id: number,
      name: string,
      category: OrderStatus,
      sold: number,
      revenue: number
}

export type TopCustomers = {
      user_id: number,
      name: string,
      totalSpent: number,
      totalOrders: number,
}