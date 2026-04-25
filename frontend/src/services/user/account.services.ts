import type { AccountInfoResponseType } from "@/types/api-response.types";
import api from "../axios";
import type { UpdateAccountInfoType } from "@/types/user/account.types";

export const accountInfoService = async (): Promise<AccountInfoResponseType> => {
      try {
            const response = await api.get<AccountInfoResponseType>(`/account/me`);
            return response.data;
      } catch (error: any) {
            // Handle error properly
            if (error.response) {
                  // Backend responded with an error
                  throw new Error(error.response.data.message || "Failed to create account");
            } else {
                  // Network error or other
                  throw new Error(error.message || "Failed to create account");
            }
      }
};

export const updateAccountInfo = async(user_id: number, updated_data: UpdateAccountInfoType): Promise<AccountInfoResponseType> => {
      try {
            const response = await api.put<AccountInfoResponseType>(`/account/update`, updated_data, { params: { user_id }});
            return response.data;
      } catch (error: any) {
            // Handle error properly
            if (error.response) {
                  // Backend responded with an error
                  throw new Error(error.response.data.message || "Failed to create account");
            } else {
                  // Network error or other
                  throw new Error(error.message || "Failed to create account");
            }
      }
};