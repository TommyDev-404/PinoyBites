import type { AdminGetOrdersResponse, AdminOrderStatisticsResponse, NormalApiResponse } from "@/types/api-response.types";
import api from "../axios";
import type { OrderStatus } from "@/types/user/order.types";

export const getAllOrdersService = async (status: string, search: string): Promise<AdminGetOrdersResponse> => {
      try {
            const response = await api.get<AdminGetOrdersResponse>(`/admin/orders/get-all`, { params: { status, search } });
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

export const getOrderStatistics = async (): Promise<AdminOrderStatisticsResponse> => {
      try {
            const response = await api.get<AdminOrderStatisticsResponse>(`/admin/orders/get-statistics`);
            return response.data;
      } catch (error: any) {
            // Handle error properly
            if (error.response) {
                  // Backend responded with an error
                  throw new Error(error.response.data.message || "Failed to retrieve order statistics");
            } else {
                  // Network error or other
                  throw new Error(error.message || "Failed to retrieve order statistics");
            }
      }
};

export const updateOrderStatus = async (order_id: number, status: OrderStatus): Promise<NormalApiResponse> => {
      try {
            const response = await api.put<NormalApiResponse>(`/admin/orders/update-status`, {}, { params: { order_id, status }});
            return response.data;
      } catch (error: any) {
            // Handle error properly
            if (error.response) {
                  // Backend responded with an error
                  throw new Error(error.response.data.message || "Failed to retrieve order statistics");
            } else {
                  // Network error or other
                  throw new Error(error.message || "Failed to retrieve order statistics");
            }
      }
};
