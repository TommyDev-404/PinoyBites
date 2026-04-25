import type { AdminIndividualProductInfoResponse, AdminProductsResponse, NormalApiResponse } from "@/types/api-response.types";
import api from "../axios";
import type { AllProductsInfo, UpdateProductsInfo } from "@/types/admin/products.types";

export const getAdminAllProducts = async (): Promise<AdminProductsResponse> => {
      try {
            const response = await api.get<AdminProductsResponse>(`/admin/products/get-all`);
            return response.data;
      } catch (error: any) {
            // Handle error properly
            if (error.response) {
                  // Backend responded with an error
                  throw new Error(error.response.data.message || "Failed to retrieve all products");
            } else {
                  // Network error or other
                  throw new Error(error.message || "Failed to retrieve all products");
            }
      }
};

export const addProductInfo = async (data: AllProductsInfo): Promise<NormalApiResponse> => {
      try {
            const response = await api.post<NormalApiResponse>(`/admin/products/add`, data);
            return response.data;
      } catch (error: any) {
            // Handle error properly
            if (error.response) {
                  // Backend responded with an error
                  throw new Error(error.response.data.message || "Failed to retrieve order statistics");
            } else {
                  // Network error or other
                  throw new Error(error.message || "Failed to retrieve order statistics");
            }
      }
};

export const updateProductInfo = async (product_id: number, updated_data: UpdateProductsInfo): Promise<NormalApiResponse> => {
      try {
            const response = await api.put<NormalApiResponse>(`/admin/products/update`, updated_data, { params: { product_id }});
            return response.data;
      } catch (error: any) {
            // Handle error properly
            if (error.response) {
                  // Backend responded with an error
                  throw new Error(error.response.data.message || "Failed to update products");
            } else {
                  // Network error or other
                  throw new Error(error.message || "Failed to update products");
            }
      }
};

export const removeProduct = async (product_id: number): Promise<NormalApiResponse> => {
      try {
            const response = await api.delete<NormalApiResponse>(`/admin/products/remove`, { params: { product_id }});
            return response.data;
      } catch (error: any) {
            // Handle error properly
            if (error.response) {
                  // Backend responded with an error
                  throw new Error(error.response.data.message || "Failed to remove products");
            } else {
                  // Network error or other
                  throw new Error(error.message || "Failed to remove products");
            }
      }
};

export const viewProduct = async (product_id: number): Promise<AdminIndividualProductInfoResponse> => {
      try {
            const response = await api.get<AdminIndividualProductInfoResponse>(`/admin/products/view`, { params: { product_id }});
            return response.data;
      } catch (error: any) {
            // Handle error properly
            if (error.response) {
                  // Backend responded with an error
                  throw new Error(error.response.data.message || "Failed to retrieve products");
            } else {
                  // Network error or other
                  throw new Error(error.message || "Failed to retrieve products");
            }
      }
};
