import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { allNotifications, markAllNotificationRead, markIndividualNotificationRead, rateProducts, viewOrderInfo } from "@/services/user/notification.services";
import type { SubmitProductRatingInfo } from "@/types/user/notification.types";
import type { NormalApiResponse, NotificationsApiResponse } from "@/types/api-response.types";
import toast from "react-hot-toast";
import { PlaySound } from "@/utils/PlaySound";

export const useNotifications = (user_id: number) => {
      return useQuery<NotificationsApiResponse>({
            queryKey: ["notifications", user_id],
            queryFn: () => allNotifications(user_id),
            enabled: !!user_id
      });
};

export const useViewOrder = (user_id: number, order_id: number) => {
      return useQuery({
            queryKey: ["viewOrder", user_id, order_id],
            queryFn: () => viewOrderInfo(user_id, order_id),
            enabled: !!user_id && !!order_id, // prevents running with undefined values
      });
};

// mutations
export const useMarkNotificationRead = () => {
      const queryClient = useQueryClient();

      return useMutation<NormalApiResponse, Error, { user_id: number; notif_id: number }>({
            mutationFn: ({ user_id, notif_id }: { user_id: number; notif_id: number }) =>
                  markIndividualNotificationRead(user_id, notif_id),
            onSuccess: (_, variables) => {
                  queryClient.invalidateQueries({ queryKey: ["notifications", variables.user_id] });
            },
      });
};

export const useMarkAllNotificationsRead = () => {
      const queryClient = useQueryClient();

      return useMutation<NormalApiResponse, Error, { user_id: number }>({
            mutationFn: ({ user_id }: { user_id: number }) =>
                  markAllNotificationRead(user_id),
            onSuccess: (_, variables) => {
                  queryClient.invalidateQueries({ queryKey: ["notifications", variables.user_id] });
            },
      });
};

export const useRateProducts = (onClose: () => void) => {
      const queryClient = useQueryClient();

      return useMutation<NormalApiResponse, Error, SubmitProductRatingInfo>({
            mutationFn: (data: SubmitProductRatingInfo) =>
                  rateProducts(data),
            onSuccess: (data, variables) => {
                  queryClient.invalidateQueries({ queryKey: ["notifications", variables.user_id] });

                  toast.success(data.message);
                  PlaySound();
                  onClose();
            },
      });
};


