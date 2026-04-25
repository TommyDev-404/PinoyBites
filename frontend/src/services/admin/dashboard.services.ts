import type { AdminGetDashboardStatisctisResponse, AdminGetOrderStatusDistributionResponse, AdminGetRecentOrdersResponse, AdminGetTopCustomersResponse, AdminGetTopSellingProductsResponse, NormalApiResponse } from "@/types/api-response.types";
import api from "../axios";

export const getDashboardStatistics= async (): Promise<AdminGetDashboardStatisctisResponse> => {
      try {
            const response = await api.get<AdminGetDashboardStatisctisResponse>(`/admin/dashboard/statistics`);
            return response.data;
      } catch (error: any) {
            // Handle error properly
            if (error.response) {
                  // Backend responded with an error
                  throw new Error(error.response.data.message || "Failed to retrieve all orders");
            } else {
                  // Network error or other
                  throw new Error(error.message || "Failed to retrieve all orders");
            }
      }
};

export const getRecentOrders = async (): Promise<AdminGetRecentOrdersResponse> => {
      try {
            const response = await api.get<AdminGetRecentOrdersResponse>(`/admin/dashboard/recent-orders`);
            return response.data;
      } catch (error: any) {
            // Handle error properly
            if (error.response) {
                  // Backend responded with an error
                  throw new Error(error.response.data.message || "Failed to retrieve all orders");
            } else {
                  // Network error or other
                  throw new Error(error.message || "Failed to retrieve all orders");
            }
      }
};

export const getOrderStatusDistribution = async (): Promise<AdminGetOrderStatusDistributionResponse> => {
      try {
            const response = await api.get<AdminGetOrderStatusDistributionResponse>(`/admin/dashboard/order-status-distribution`);
            return response.data;
      } catch (error: any) {
            // Handle error properly
            if (error.response) {
                  // Backend responded with an error
                  throw new Error(error.response.data.message || "Failed to retrieve all customer order history");
            } else {
                  // Network error or other
                  throw new Error(error.message || "Failed to retrieve all customer order history");
            }
      }
};

export const getTopSellingProducts = async (): Promise<AdminGetTopSellingProductsResponse> => {
      try {
            const response = await api.get<AdminGetTopSellingProductsResponse>(`/admin/dashboard/top-selling-products`);
            return response.data;
      } catch (error: any) {
            // Handle error properly
            if (error.response) {
                  // Backend responded with an error
                  throw new Error(error.response.data.message || "Failed to retrieve all customer order history");
            } else {
                  // Network error or other
                  throw new Error(error.message || "Failed to retrieve all customer order history");
            }
      }
};

export const getTopCustomers = async (): Promise<AdminGetTopCustomersResponse> => {
      try {
            const response = await api.get<AdminGetTopCustomersResponse>(`/admin/dashboard/top-customers`);
            return response.data;
      } catch (error: any) {
            // Handle error properly
            if (error.response) {
                  // Backend responded with an error
                  throw new Error(error.response.data.message || "Failed to retrieve all customer order history");
            } else {
                  // Network error or other
                  throw new Error(error.message || "Failed to retrieve all customer order history");
            }
      }
};
