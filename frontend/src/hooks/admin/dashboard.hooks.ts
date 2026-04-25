
import type { 
      AdminGetDashboardStatisctisResponse, 
      AdminGetOrderStatusDistributionResponse, 
      AdminGetRecentOrdersResponse,
      AdminGetTopCustomersResponse,
      AdminGetTopSellingProductsResponse, 
} from "@/types/api-response.types";
import { useQuery } from "@tanstack/react-query";
import { getDashboardStatistics, getOrderStatusDistribution, getRecentOrders, getTopCustomers, getTopSellingProducts } from "@/services/admin/dashboard.services";


export const useAdminDashboardStatistics = () => {
      return useQuery<AdminGetDashboardStatisctisResponse>({
            queryKey: ["adminDashboardStatistics"], 
            queryFn:  getDashboardStatistics, 
      });
};

export const useAdminRecentOrders = () => {
      return useQuery<AdminGetRecentOrdersResponse>({
            queryKey: ["adminRecentOrders"], 
            queryFn:  getRecentOrders, 
      });
};

export const useAdminOrderStatusDistribution = () => {
      return useQuery<AdminGetOrderStatusDistributionResponse>({
            queryKey: ["adminOrderStatusDistribution"], 
            queryFn:  getOrderStatusDistribution
      });
};

export const useAdminTopSellingProducts= () => {
      return useQuery<AdminGetTopSellingProductsResponse>({
            queryKey: ["adminTopSellingProducts"], 
            queryFn:  getTopSellingProducts
      });
};

export const useAdminTopCustomers= () => {
      return useQuery<AdminGetTopCustomersResponse>({
            queryKey: ["adminTopCustomers"], 
            queryFn:  getTopCustomers
      });
};