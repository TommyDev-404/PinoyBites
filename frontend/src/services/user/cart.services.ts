
import api from "../axios";
import type { GetCartsApiResponse, NormalApiResponse, UserPromoReceivedResponse } from "@/types/api-response.types";


export const addToCart = async (user_id: number, product_id: number, quantity: number): Promise<NormalApiResponse> => {
      try {
            const response = await api.post<NormalApiResponse>(`/cart/add`, { user_id, product_id, quantity });
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

export const updateCartItem = async (user_id: number, product_id: number, quantity: number): Promise<NormalApiResponse> => {
      try {
            const response = await api.post<NormalApiResponse>(`/cart/update`, { user_id, product_id, quantity });
            return response.data;
      } catch (error: any) {
            // Handle error properly
            if (error.response) {
                  // Backend responded with an error
                  throw new Error(error.response.data.message || "Failed to update cart.");
            } else {
                  // Network error or other
                  throw new Error(error.message || "Failed to update cart.");
            }
      }
};

export const getCartItems = async (user_id: number): Promise<GetCartsApiResponse> => {
      try {
            const response = await api.get<GetCartsApiResponse>(`/cart/get`, { params: { user_id } });
            return response.data;
      } catch (error: any) {  
            // Handle error properly
            if (error.response) {
                  // Backend responded with an error
                  throw new Error(error.response.data.message || "Failed to get cart items.");
            } else {
                  // Network error or other
                  throw new Error(error.message || "Failed to get cart items.");
            }
      }
};

export const removeCartItem = async (user_id: number, product_id: number): Promise<NormalApiResponse> => {
      try {
            const response = await api.delete<NormalApiResponse>(`/cart/remove`, { params: { user_id, product_id } });
            return response.data;
      } catch (error: any) {
            // Handle error properly
            if (error.response) {
                  // Backend responded with an error
                  throw new Error(error.response.data.message || "Failed to remove cart.");
            } else {
                  // Network error or other
                  throw new Error(error.message || "Failed to remove cart.");
            }
      }
};

export const getUserValidPromo = async (user_id: number): Promise<UserPromoReceivedResponse> => {
      try {
            const response = await api.get<UserPromoReceivedResponse>(`/cart/get-promo`, { params: { user_id } });
            return response.data;
      } catch (error: any) {
            // Handle error properly
            if (error.response) {
                  // Backend responded with an error
                  throw new Error(error.response.data.message || "Failed to retrieve promo.");
            } else {
                  // Network error or other
                  throw new Error(error.message || "Failed to retrieve promo.");
            }
      }
};