import { accountInfoService, updateAccountInfo } from "@/services/user/account.services";
import type { UpdateAccountInfoType } from "@/types/user/account.types";
import type { AccountInfoResponseType } from "@/types/api-response.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useAccount = () => {
      return useQuery<AccountInfoResponseType>({
            queryKey: ["account"], // Include filters in the query key to refetch when they change
            queryFn:  accountInfoService, // Fetch products with the provided filters,
      });
};

export const useUpdateAccount = () => {
      const queryClient = useQueryClient();

      return useMutation<AccountInfoResponseType,  Error, { user_id: number, updated_data: UpdateAccountInfoType }>({
            mutationFn: ({ user_id, updated_data } : { user_id: number,  updated_data: UpdateAccountInfoType}) => updateAccountInfo(user_id, updated_data),
            onSuccess: (_, variables) => {
                  queryClient.invalidateQueries({ queryKey: ["account"]});
            }
      });
};