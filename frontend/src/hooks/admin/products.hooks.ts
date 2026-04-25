import { addProductInfo, getAdminAllProducts, removeProduct, updateProductInfo, viewProduct } from "@/services/admin/products.services";
import type { AllProductsInfo, UpdateProductsInfo } from "@/types/admin/products.types";
import type {AdminIndividualProductInfoResponse, AdminProductsResponse, NormalApiResponse } from "@/types/api-response.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useAdminAllProducts = () => {
      return useQuery<AdminProductsResponse>({
            queryKey: ["adminProducts"], 
            queryFn:  getAdminAllProducts, 
      });
};

export const useAdminViewProduct = (product_id: number) => {
      return useQuery<AdminIndividualProductInfoResponse>({
            queryKey: ["adminViewProduct", product_id], 
            queryFn: () => viewProduct(product_id), 
      });
};

// mutation
export const useAdminAddProduct= () => {
      const queryClient = useQueryClient();

      return useMutation<NormalApiResponse, Error, AllProductsInfo>({
            mutationFn: async (data) => addProductInfo(data),
            onSuccess: async (_, variables) => {
                  await queryClient.invalidateQueries({ queryKey: ["adminProducts"] });
            },
      });   
};

export const useAdminUpdateProduct= () => {
      const queryClient = useQueryClient();

      return useMutation<NormalApiResponse, Error, { product_id: number, updated_data: UpdateProductsInfo }>({
            mutationFn: async ({ product_id, updated_data } ) => updateProductInfo(product_id, updated_data),
            onSuccess: (_, variables) => {
                  queryClient.invalidateQueries({ queryKey: ["adminProducts"] });
            },
            });   
};

export const useAdminRemoveProduct= () => {
      const queryClient = useQueryClient();

      return useMutation<NormalApiResponse, Error, { product_id: number }>({
            mutationFn: async ({ product_id } : { product_id: number }) => removeProduct(product_id),
            onSuccess: (_, variables) => {
                  queryClient.invalidateQueries({ queryKey: ["adminProducts"] });
            },
            });   
};
