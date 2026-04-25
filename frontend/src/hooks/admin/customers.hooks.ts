import { 
      banCustomerService, 
      getAllCustomers, 
      getCustomerOrderHistory, 
      getCustomersStatistics, 
      unBanCustomerService 
} from "@/services/admin/customers.services";
import type { 
      AdminAllCustomerOrderHistoryResponse, 
      AdminAllCustomersResponse, 
      AdminCustomerStatisticsResponse, 
      NormalApiResponse 
} from "@/types/api-response.types";
import type { BanUserData } from "@/types/admin/customers.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { PlaySound } from "@/utils/PlaySound";


export const useAdminCustomerStatistics = () => {
      return useQuery<AdminCustomerStatisticsResponse>({
            queryKey: ["adminCustomerStatistics"], 
            queryFn:  getCustomersStatistics, 
      });
};

export const useAdminAllCustomers = () => {
      return useQuery<AdminAllCustomersResponse>({
            queryKey: ["adminCustomers"], 
            queryFn:  getAllCustomers, 
      });
};

export const useAdminAllCustomerOrderHistory = (user_id: number, options: any) => {
      return useQuery<AdminAllCustomerOrderHistoryResponse>({
            queryKey: ["adminCustomerOrderHistory"], 
            queryFn:  () => getCustomerOrderHistory(user_id),
            ...options
      });
};

// mutation
export const useAdminBanCustomer = (onClose: () => void) => {
      const queryClient = useQueryClient();

      return useMutation<NormalApiResponse, Error, { user_id: number, data: BanUserData }>({
            mutationFn: async ({ user_id, data } : { user_id: number, data: BanUserData}) => banCustomerService(user_id, data),
            onSuccess: (_, variables) => {
                  queryClient.invalidateQueries({ queryKey: ["adminCustomers"] });
                  queryClient.invalidateQueries({ queryKey: ["adminCustomerStatistics"] });
                  toast.success('User banned successfully!');
                  PlaySound();
                  onClose();
            },
            });   
};

export const useAdminUnBanCustomer = (onClose: () => void) => {
      const queryClient = useQueryClient();

      return useMutation<NormalApiResponse, Error, { user_id: number, reason: string }>({
            mutationFn: async ({ user_id, reason } : { user_id: number, reason: string}) => unBanCustomerService(user_id, reason),
            onSuccess: (_, variables) => {
                  queryClient.invalidateQueries({ queryKey: ["adminCustomers"] });
                  queryClient.invalidateQueries({ queryKey: ["adminCustomerStatistics"] });
                  toast.success('User unbanned successfully!');
                  PlaySound();
                  onClose();
            },
            });   
};
