
import { addLoyaltyTier, getAllIssuedPromoCodes, getAllLoyaltyTier, getPromoStatistics, removeLoyaltyTier, updateLoyaltyTier } from "@/services/admin/promo.services";
import type { LoyaltyTierInfo, UpdateLoyaltyTierInfo } from "@/types/admin/promo.types";
import type { AdminGetIssuedPromoCodesResponse, AdminGetLoyaltyTierResponse, AdminGetPromoStatisctisResponse, NormalApiResponse } from "@/types/api-response.types";
import { PlaySound } from "@/utils/PlaySound";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useAdminAllLoyaltyTiers = () => {
      return useQuery<AdminGetLoyaltyTierResponse>({
            queryKey: ["adminLoyaltyTiers"], 
            queryFn:  getAllLoyaltyTier,
      });
};

export const useAdminAllIssuedPromo = () => {
      return useQuery<AdminGetIssuedPromoCodesResponse>({
            queryKey: ["adminLoyaltyPromos"], 
            queryFn:  getAllIssuedPromoCodes,
      });
};

export const useAdminPromoStatistics = () => {
      return useQuery<AdminGetPromoStatisctisResponse>({
            queryKey: ["adminPromoStatistics"], 
            queryFn:  getPromoStatistics,
      });
};

// mutation
export const useAdminAddLoyaltyTier = (onClose: () => void) => {
      const queryClient = useQueryClient();

      return useMutation<NormalApiResponse, Error, LoyaltyTierInfo>({
            mutationFn: async (data) => addLoyaltyTier(data),
            onSuccess: (data, variables) => {
                  queryClient.invalidateQueries({ queryKey: ["adminLoyaltyTiers"] });
                  queryClient.invalidateQueries({ queryKey: ["adminPromoStatistics"] }); 
                  queryClient.invalidateQueries({ queryKey: ["adminLoyaltyPromos"] })

                  onClose();
                  toast.success(data.message);
                  PlaySound();
            },
      });   
};

export const useAdminUpdateLoyaltyTier = (onClose: () => void) => {
      const queryClient = useQueryClient();

      return useMutation<NormalApiResponse, Error, {id: number, updated_data: UpdateLoyaltyTierInfo }>({
            mutationFn: async ({ id, updated_data } : { id: number, updated_data: UpdateLoyaltyTierInfo }) => updateLoyaltyTier(id, updated_data),
            onSuccess: (data, variables) => {
                  queryClient.invalidateQueries({ queryKey: ["adminLoyaltyTiers"] });
                  queryClient.invalidateQueries({ queryKey: ["adminPromoStatisctics"] });
                  queryClient.invalidateQueries({ queryKey: ["adminLoyaltyPromos"] })
                  
                  onClose();
                  toast.success(data.message);
                  PlaySound();
            },
      });   
};

export const useAdminRemoveLoyaltyTier = (onClose: () => void) => {
      const queryClient = useQueryClient();

      return useMutation<NormalApiResponse, Error, {id: number }>({
            mutationFn: async ({ id } : { id: number}) => removeLoyaltyTier(id),
            onSuccess: (data, variables) => {
                  queryClient.invalidateQueries({ queryKey: ["adminLoyaltyTiers"] });
                  queryClient.invalidateQueries({ queryKey: ["adminPromoStatisctics"] });
                  queryClient.invalidateQueries({ queryKey: ["adminLoyaltyPromos"] })
                  
                  onClose();
                  toast.success(data.message);
                  PlaySound();
            },
      });   
};