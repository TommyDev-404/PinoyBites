import type { AdminGetIssuedPromoCodesResponse, AdminGetLoyaltyTierResponse, AdminGetPromoStatisctisResponse, AdminNotificationsResponse, NormalApiResponse } from "@/types/api-response.types";
import api from "../axios";
import type { LoyaltyTierInfo, UpdateLoyaltyTierInfo } from "@/types/admin/promo.types";

export const getAllLoyaltyTier = async (): Promise<AdminGetLoyaltyTierResponse> => {
      try {
            const response = await api.get<AdminGetLoyaltyTierResponse>(`/admin/promo/get-all/loyalty-tiers`);
            return response.data;
      } catch (error: any) {
            // Handle error properly
            if (error.response) {
                  // Backend responded with an error
                  throw new Error(error.response.data.message || "Failed to retrieve all loyalty tiers");
            } else {
                  // Network error or other
                  throw new Error(error.message || "Failed to retrieve all loyalty tiers");
            }
      }
};

export const getAllIssuedPromoCodes = async (): Promise<AdminGetIssuedPromoCodesResponse> => {
      try {
            const response = await api.get<AdminGetIssuedPromoCodesResponse>(`/admin/promo/get-all/issued-promo`);
            return response.data;
      } catch (error: any) {
            // Handle error properly
            if (error.response) {
                  // Backend responded with an error
                  throw new Error(error.response.data.message || "Failed to retrieve all issued promo");
            } else {
                  // Network error or other
                  throw new Error(error.message || "Failed to retrieve all issued promo");
            }
      }
};

export const getPromoStatistics = async (): Promise<AdminGetPromoStatisctisResponse> => {
      try {
            const response = await api.get<AdminGetPromoStatisctisResponse>(`/admin/promo/get/statistics`);
            return response.data;
      } catch (error: any) {
            // Handle error properly
            if (error.response) {
                  // Backend responded with an error
                  throw new Error(error.response.data.message || "Failed to retrieve statictics");
            } else {
                  // Network error or other
                  throw new Error(error.message || "Failed to retrieve statictics");
            }
      }
};

export const addLoyaltyTier = async (data: LoyaltyTierInfo): Promise<NormalApiResponse> => {
      try {
            const response = await api.post<NormalApiResponse>(`/admin/promo/add/loyalty-tier`, data);
            return response.data;
      } catch (error: any) {
            // Handle error properly
            if (error.response) {
                  // Backend responded with an error
                  throw new Error(error.response.data.message || "Failed to add loyalty tiers");
            } else {
                  // Network error or other
                  throw new Error(error.message || "Failed to add loyalty tiers");
            }
      }
};

export const updateLoyaltyTier = async (tier_id: number, updated_data: UpdateLoyaltyTierInfo): Promise<NormalApiResponse> => {
      try {
            const response = await api.put<NormalApiResponse>(`/admin/promo/update/loyalty-tier`, updated_data, { params: { tier_id }});
            return response.data;
      } catch (error: any) {
            // Handle error properly
            if (error.response) {
                  // Backend responded with an error
                  throw new Error(error.response.data.message || "Failed to update loyalty tiers");
            } else {
                  // Network error or other
                  throw new Error(error.message || "Failed to update loyalty tiers");
            }
      }
};

export const removeLoyaltyTier = async (tier_id: number): Promise<NormalApiResponse> => {
      try {
            const response = await api.delete<NormalApiResponse>(`/admin/promo/remove/loyalty-tier`, { params: { tier_id }});
            return response.data;
      } catch (error: any) {
            // Handle error properly
            if (error.response) {
                  // Backend responded with an error
                  throw new Error(error.response.data.message || "Failed to update loyalty tiers");
            } else {
                  // Network error or other
                  throw new Error(error.message || "Failed to update loyalty tiers");
            }
      }
};