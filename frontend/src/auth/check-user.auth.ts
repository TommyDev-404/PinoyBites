
import type { GetUserCurrentlyLggedResponse } from "@/types/api-response.types";
import api from "../services/axios";

export const checkCurrentLoggedUser = async (): Promise<GetUserCurrentlyLggedResponse> => {
      try {
            const response = await api.get<GetUserCurrentlyLggedResponse>("/auth/account-check/get");
            return response.data;
      } catch (error: any) {
            // Handle error properly
            if (error.response) {
                  // Backend responded with an error
                  throw new Error(error.response.data.message || "Failed to check user!");
            } else {
                  // Network error or other
                  throw new Error(error.message || "Failed to check user!");
            }
      }
};