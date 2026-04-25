import type { AdminLoginData } from "@/types/admin/auth.types";
import type { AdminLoginResponse, NormalApiResponse } from "@/types/api-response.types";
import api from "../axios";

export const adminLoginService = async (data: AdminLoginData): Promise<AdminLoginResponse> => {
      try {
            const response = await api.post<AdminLoginResponse>("/admin/auth/login", data);
            return response.data;
      } catch (error: any) {
            // Handle error properly
            if (error.response) {
                  // Backend responded with an error
                  throw new Error(error.response.data.message || "Failed to login admin!");
            } else {
                  // Network error or other
                  throw new Error(error.message || "Failed to login admin!");
            }
      }
};

export const adminLogoutService = async (): Promise<NormalApiResponse> => {
      try {
            const response = await api.post<NormalApiResponse>("/admin/auth/logout");
            return response.data;
      } catch (error: any) {
            // Handle error properly
            if (error.response) {
                  // Backend responded with an error
                  throw new Error(error.response.data.message || "Failed to logout admin!");
            } else {
                  // Network error or other
                  throw new Error(error.message || "Failed to logout admin!");
            }
      }
};