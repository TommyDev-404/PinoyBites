import type { GetProductsInfo, NormalApiResponse } from "@/types/api-response.types";
import api from "../axios";
import type { ProductType, ProductFilters } from "@/types/user/products.types";

export const getProducts = async (filters: ProductFilters): Promise<GetProductsInfo> => {
      try {
            const response = await api.get<GetProductsInfo>(`/products`, { params: filters });
            return response.data;
      } catch (error: any) {
            // Handle error properly
            if (error.response) {
                  // Backend responded with an error
                  throw new Error(error.response.data.message || "Failed to fetch products.");
            } else {
                  // Network error or other
                  throw new Error(error.message || "Failed to fetch products.");
            }
      }
};

export const getFeaturedProducts = async (): Promise<GetProductsInfo> => {
      try {
            const response = await api.get<GetProductsInfo>(`/products/featured`);
            return response.data;
      } catch (error: any) {        
            // Handle error properly
            if (error.response) {
                  // Backend responded with an error
                  throw new Error(error.response.data.message || "Failed to fetch featured products.");
            } else {
                  // Network error or other
                  throw new Error(error.message || "Failed to fetch featured products.");
            }
      }
};

export const addUserFavoriteProduct = async (userId: number, productId: number): Promise<NormalApiResponse> => {
      try {
            const response = await api.post<NormalApiResponse>(`/products/toggle-favorites`, { userId, productId });
            return response.data;
      } catch (error: any) {        
            // Handle error properly
            if (error.response) {
                  // Backend responded with an error
                  throw new Error(error.response.data.message || "Failed to add user favorite products.");
            } else {
                  // Network error or other
                  throw new Error(error.message || "Failed to add user favorite products.");
            }
      }
};

export const getUserFavoriteProducts = async (userId: number): Promise<ProductType[]> => {
      try {
            const response = await api.get<ProductType[]>(`/products/user-favorites`, { params: { userId } });
            return response.data;
      } catch (error: any) {        
            // Handle error properly
            if (error.response) {
                  // Backend responded with an error
                  throw new Error(error.response.data.message || "Failed to fetch user favorite products.");
            } else {
                  // Network error or other
                  throw new Error(error.message || "Failed to fetch user favorite products.");
            }
      }
};