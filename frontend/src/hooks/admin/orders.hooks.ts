import { getAllOrdersService, getOrderStatistics, updateOrderStatus } from "@/services/admin/orders.services";
import type { AdminGetOrdersResponse, AdminOrderStatisticsResponse, NormalApiResponse } from "@/types/api-response.types";
import type { OrderStatus } from "@/types/user/order.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useAdminAllOrders = (status: string, search: string) => {
      return useQuery<AdminGetOrdersResponse>({
            queryKey: ["adminOrders", status, search], // Include filters in the query key to refetch when they change
            queryFn:  () => getAllOrdersService(status, search), // Fetch products with the provided filters,
      });
};

export const useAdminOrdersStatistics = () => {
      return useQuery<AdminOrderStatisticsResponse>({
            queryKey: ["adminOrderStatistics"], // Include filters in the query key to refetch when they change
            queryFn:  getOrderStatistics, // Fetch products with the provided filters,
      });
};

// mutation
export const useAdminUpdateOrderStatus = () => {
      const queryClient = useQueryClient();
      return useMutation<NormalApiResponse, Error, { order_id: number; status: OrderStatus }>({
            mutationFn: async ({ order_id, status } : { order_id: number, status: OrderStatus}) => updateOrderStatus(order_id, status),
            onSuccess: (_, variables) => {
                  queryClient.invalidateQueries({ queryKey: ["adminOrders"] });
                  queryClient.invalidateQueries({ queryKey: ["adminOrderStatistics"] });
                  queryClient.invalidateQueries({ queryKey: ["adminProducts"] });
                  queryClient.invalidateQueries({ queryKey: ["adminDashboardStatistics"] });
                  queryClient.invalidateQueries({ queryKey: ["adminOrderStatusDistribution"] });
            },
            });   
};
