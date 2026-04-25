import type { SubmitProductRatingInfo } from "@/types/user/notification.types";
import api from "../axios"; // your Axios instance
import type { NormalApiResponse, NotificationsApiResponse, ViewOrderApiResponse } from "../../types/api-response.types";

export const allNotifications = async (user_id: number): Promise<NotificationsApiResponse> => {
      try {
            const response = await api.get<NotificationsApiResponse>(`/notifications/get`, { params: { user_id } });
            return response.data;
      } catch (error: any) {
            // Handle error properly
            if (error.response) {
                  // Backend responded with an error
                  throw new Error(error.response.data.message || "Failed to fetch all notifications!");
            } else {
                  // Network error or other
                  throw new Error(error.message || "Failed to fetch all notifications!");
            }
      }
};

export const markAllNotificationRead = async (user_id: number): Promise<NormalApiResponse> => {
      try {
            const response = await api.put<NormalApiResponse>(`/notifications/read-all`, {}, { params: { user_id } });
            return response.data;
      } catch (error: any) {
            // Handle error properly
            if (error.response) {
                  // Backend responded with an error
                  throw new Error(error.response.data.message || "Failed to mark all notifications!");
            } else {
                  // Network error or other
                  throw new Error(error.message || "Failed to mark all notifications!");
            }
      }
};

export const markIndividualNotificationRead = async (user_id: number, notif_id: number): Promise<NormalApiResponse> => {
      try {
            const response = await api.put<NormalApiResponse>(`/notifications/read`, {}, { params: { user_id, notif_id } });
            return response.data;
      } catch (error: any) {
            // Handle error properly
            if (error.response) {
                  // Backend responded with an error
                  throw new Error(error.response.data.message || "Failed to mark notifications!");
            } else {
                  // Network error or other
                  throw new Error(error.message || "Failed to mark notifications!");
            }
      }
};

export const rateProducts = async (data: SubmitProductRatingInfo): Promise<NormalApiResponse> => {
      try {
            const response = await api.post<NormalApiResponse>(`/notifications/rate-products`, data);
            return response.data;
      } catch (error: any) {
            // Handle error properly
            if (error.response) {
                  // Backend responded with an error
                  throw new Error(error.response.data.message || "Failed to mark notifications!");
            } else {
                  // Network error or other
                  throw new Error(error.message || "Failed to mark notifications!");
            }
      }
};

export const checkIfNotifNeedRating = async (user_id: Number, order_id: number): Promise<NormalApiResponse> => {
      try {
            const response = await api.get<NormalApiResponse>(`/notifications/rate-products`, { params: { user_id, order_id } });
            return response.data;
      } catch (error: any) {
            // Handle error properly
            if (error.response) {
                  // Backend responded with an error
                  throw new Error(error.response.data.message || "Failed to mark notifications!");
            } else {
                  // Network error or other
                  throw new Error(error.message || "Failed to mark notifications!");
            }
      }
};

export const viewOrderInfo = async (user_id: Number, order_id: number): Promise<ViewOrderApiResponse> => {
      try {
            const response = await api.get<ViewOrderApiResponse>(`/notifications/get-order-info`, { params: { user_id, order_id } });
            return response.data;
      } catch (error: any) {
            // Handle error properly
            if (error.response) {
                  // Backend responded with an error
                  throw new Error(error.response.data.message || "Failed to mark notifications!");
            } else {
                  // Network error or other
                  throw new Error(error.message || "Failed to mark notifications!");
            }
      }
};