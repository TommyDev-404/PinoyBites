import type { AdminNotificationsResponse, AdminNotReadNotifCountResponse, NormalApiResponse } from "@/types/api-response.types";
import api from "../axios";

export const getAllNotifications = async (): Promise<AdminNotificationsResponse> => {
      try {
            const response = await api.get<AdminNotificationsResponse>(`/admin/notifications/get`);
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

export const getNotReadNotificationsCount = async (): Promise<AdminNotReadNotifCountResponse> => {
      try {
            const response = await api.get<AdminNotReadNotifCountResponse>(`/admin/notifications/get/count`);
            return response.data;
      } catch (error: any) {
            // Handle error properly
            if (error.response) {
                  // Backend responded with an error
                  throw new Error(error.response.data.message || "Failed to retrieve notifications count");
            } else {
                  // Network error or other
                  throw new Error(error.message || "Failed to retrieve notifications count");
            }
      }
};

export const markNotifRead = async (notif_id: number): Promise<NormalApiResponse> => {
      try {
            const response = await api.put<NormalApiResponse>(`/admin/notifications/mark-read`, {}, { params: { notif_id } });
            return response.data;
      } catch (error: any) {
            // Handle error properly
            if (error.response) {
                  // Backend responded with an error
                  throw new Error(error.response.data.message || "Failed to mark notifications read");
            } else {
                  // Network error or other
                  throw new Error(error.message || "Failed to mark notifications read");
            }
      }
};
