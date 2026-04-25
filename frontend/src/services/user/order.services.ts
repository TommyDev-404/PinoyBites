import type { GetOrdersApiResponse, NormalApiResponse, UserFeedbackApiResponse } from "@/types/api-response.types";
import api from "../axios";
import type { OrderStatus, PlaceOrderInfo, UserFeedbackType } from "@/types/user/order.types";


export const getOrders = async (user_id: number, status: OrderStatus): Promise<GetOrdersApiResponse> => {
      try {
            const response = await api.get<GetOrdersApiResponse>(`/order/get`, { params: { user_id, status } });
            return response.data;
      } catch (error: any) {
            // Handle error properly
            if (error.response) {
                  // Backend responded with an error
                  throw new Error(error.response.data.message || "Failed to fetch orders.");
            } else {
                  // Network error or other
                  throw new Error(error.message || "Failed to fetch orders.");
            }
      }
};

export const placeOrder = async (data: PlaceOrderInfo): Promise<NormalApiResponse> => {
      try {
            const response = await api.post<NormalApiResponse>(`/order/place`, data);
            return response.data;
      } catch (error: any) {
            // Handle error properly
            if (error.response) {
                  // Backend responded with an error
                  throw new Error(error.response.data.message || "Failed to add to cart.");
            } else {
                  // Network error or other
                  throw new Error(error.message || "Failed to add to cart.");
            }
      }
};

export const cancelOrder = async (user_id: number, order_id: number): Promise<NormalApiResponse> => {
      try {
            const response = await api.delete<NormalApiResponse>(`/order/cancel`, { params: { user_id, order_id }});
            return response.data;
      } catch (error: any) {
            // Handle error properly
            if (error.response) {
                  // Backend responded with an error
                  throw new Error(error.response.data.message || "Failed to add to cart.");
            } else {
                  // Network error or other
                  throw new Error(error.message || "Failed to add to cart.");
            }
      }
};

export const checkUserFeedback = async (user_id: number): Promise<UserFeedbackApiResponse> => {
      try {
            const response = await api.get<UserFeedbackApiResponse>(`/order/check-feedback`, { params: { user_id }});
            return response.data;
      } catch (error: any) {
            // Handle error properly
            if (error.response) {
                  // Backend responded with an error
                  throw new Error(error.response.data.message || "Failed to retrieve user feedback.");
            } else {
                  // Network error or other
                  throw new Error(error.message || "Failed to retrieve user feedback.");
            }
      }
};

export const submitUserFeedback = async (data: UserFeedbackType): Promise<NormalApiResponse> => {
      try {
            const response = await api.post<NormalApiResponse>(`/order/submit-feedback`, data );
            return response.data;
      } catch (error: any) {
            // Handle error properly
            if (error.response) {
                  // Backend responded with an error
                  throw new Error(error.response.data.message || "Failed to submit user feedback.");
            } else {
                  // Network error or other
                  throw new Error(error.message || "Failed to submit user feedback.");
            }
      }
};