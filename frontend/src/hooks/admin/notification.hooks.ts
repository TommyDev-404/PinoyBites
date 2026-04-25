import { getAllNotifications, getNotReadNotificationsCount, markNotifRead } from "@/services/admin/notification.services";
import type { AdminNotificationsResponse, AdminNotReadNotifCountResponse, NormalApiResponse } from "@/types/api-response.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useAdminAllNotifications = () => {
      return useQuery<AdminNotificationsResponse>({
            queryKey: ["adminNotifications"], // Include filters in the query key to refetch when they change
            queryFn:  getAllNotifications, // Fetch products with the provided filters,
      });
};

export const useAdminNotificationsNotReadCount = () => {
      return useQuery<AdminNotReadNotifCountResponse>({
            queryKey: ["adminNotificationsNotReadCount"], // Include filters in the query key to refetch when they change
            queryFn:  getNotReadNotificationsCount, // Fetch products with the provided filters,
      });
};

// mutation
export const useAdminMarkNotifRead = () => {
      const queryClient = useQueryClient();
      return useMutation<NormalApiResponse, Error, { notif_id: number }>({
            mutationFn: async ({ notif_id } : { notif_id: number }) => markNotifRead(notif_id),
            onSuccess: (_, variables) => {
                  queryClient.invalidateQueries({ queryKey: ["adminNotifications"] });
                  queryClient.invalidateQueries({ queryKey: ["adminNotificationsNotReadCount"] });
            },
      });   
};
