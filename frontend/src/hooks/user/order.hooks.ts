import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { OrderStatus, PlaceOrderInfo, UserFeedbackType } from "@/types/user/order.types";
import { cancelOrder, checkUserFeedback, getOrders, placeOrder, submitUserFeedback } from "@/services/user/order.services";
import toast from "react-hot-toast";
import { PlaySound } from "@/utils/PlaySound";
import type { GetOrdersApiResponse, NormalApiResponse, UserFeedbackApiResponse } from "@/types/api-response.types";

export const useOrders = (user_id: number,  status: OrderStatus) => {
      return useQuery<GetOrdersApiResponse>({
            queryKey: ["orders", user_id, status], // Include filters in the query key to refetch when they change
            queryFn: () => getOrders(user_id, status), // Fetch products with the provided filters
            enabled: !!user_id
      });
};

export const useCheckUserFeedback = (user_id: number) => {
      return useQuery<UserFeedbackApiResponse>({
            queryKey: ["feedback", user_id], // Include filters in the query key to refetch when they change
            queryFn: () => checkUserFeedback(user_id), // Fetch products with the provided filters
            enabled: !!user_id
      });
};

// mutation for adding a product to favorites
export const usePlaceOrder = () => {
      const queryClient = useQueryClient();

      return useMutation<NormalApiResponse, Error, PlaceOrderInfo>({
            mutationFn: (data: PlaceOrderInfo) => placeOrder(data),
            onSuccess: (data, variables) => {
                  queryClient.invalidateQueries({ queryKey: ["orders", variables.user_id] });
                  queryClient.invalidateQueries({ queryKey: ["carts"] });
                  queryClient.invalidateQueries({ queryKey: ["notifications", variables.user_id] });

                  toast.success(data.message);
                  PlaySound();
            },
            onError: (error) => {
                  toast.error(error.message);
            }
      });
};

export const useCancelOrder = () => {
      const queryClient = useQueryClient();

      return useMutation<NormalApiResponse, Error, { user_id: number; order_id: number }>({
            mutationFn: ({ user_id, order_id }) => cancelOrder(user_id, order_id),
            onSuccess: (data, variables) => {
                  toast.success(data.message);
                  PlaySound();
                  queryClient.invalidateQueries({ queryKey: ["orders", variables.user_id] });
                  queryClient.invalidateQueries({ queryKey: ["adminNotifications"] });
                  queryClient.invalidateQueries({ queryKey: ["notifications", variables.user_id] });
            },
            onError: (error) => {
                  toast.error(error.message);
            }
      });
};

export const useSubmitFeedback = () => {
      const queryClient = useQueryClient();

      return useMutation<NormalApiResponse, Error, UserFeedbackType>({
            mutationFn: (data: UserFeedbackType) => submitUserFeedback(data),
            onSuccess: (data, variables) => {
                  queryClient.invalidateQueries({ queryKey: ["feedback", variables.user_id] });
                  queryClient.invalidateQueries({ queryKey: ["notifications", variables.user_id] });

                  toast.success(data.message);
                  PlaySound();
            },
            onError: (error) => {
                  toast.error(error.message);
            }
      });
};