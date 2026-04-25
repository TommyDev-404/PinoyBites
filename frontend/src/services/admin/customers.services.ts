import type { AdminAllCustomerOrderHistoryResponse, AdminAllCustomersResponse, AdminCustomerStatisticsResponse, NormalApiResponse } from "@/types/api-response.types";
import api from "../axios";
import type { BanUserData } from "@/types/admin/customers.types";

export const getCustomersStatistics = async (): Promise<AdminCustomerStatisticsResponse> => {
      try {
            const response = await api.get<AdminCustomerStatisticsResponse>(`/admin/customers/statistics`);
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

export const getAllCustomers = async (): Promise<AdminAllCustomersResponse> => {
      try {
            const response = await api.get<AdminAllCustomersResponse>(`/admin/customers/get-all`);
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

export const getCustomerOrderHistory = async (user_id: number): Promise<AdminAllCustomerOrderHistoryResponse> => {
      try {
            const response = await api.get<AdminAllCustomerOrderHistoryResponse>(`/admin/customers/orders-history`, { params: { user_id } });
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

export const banCustomerService = async (user_id: number, data: BanUserData ): Promise<NormalApiResponse> => {
      try {
            const response = await api.post<NormalApiResponse>(`/admin/customers/ban`, data, { params: { user_id } });
            return response.data;
      } catch (error: any) {
            // Handle error properly
            if (error.response) {
                  // Backend responded with an error
                  throw new Error(error.response.data.message || "Failed to ban  customer ");
            } else {
                  // Network error or other
                  throw new Error(error.message || "Failed to ban customer ");
            }
      }
};

export const unBanCustomerService = async (user_id: number, reason: string ): Promise<NormalApiResponse> => {
      try {
            const response = await api.delete<NormalApiResponse>(`/admin/customers/unban`, { data: { reason }, params: { user_id } });
            return response.data;
      } catch (error: any) {
            // Handle error properly
            if (error.response) {
                  // Backend responded with an error
                  throw new Error(error.response.data.message || "Failed to unban  customer ");
            } else {
                  // Network error or other
                  throw new Error(error.message || "Failed to unban customer ");
            }
      }
};