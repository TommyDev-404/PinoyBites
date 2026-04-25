import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addUserFavoriteProduct, getProducts, getUserFavoriteProducts } from "@/services/user/products.services";
import type { ProductFilters, ProductType } from "@/types/user/products.types";
import type { GetProductsInfo, NormalApiResponse } from "@/types/api-response.types";
import toast from "react-hot-toast";
import { PlaySound } from "@/utils/PlaySound";

export const useProducts = (filters: ProductFilters) => {
      return useQuery<GetProductsInfo>({
            queryKey: ["products", filters], // Include filters in the query key to refetch when they change
            queryFn: () => getProducts(filters), // Fetch products with the provided filters
      });
};

export const useFavoriteProducts = (user_id: number) => {
      return useQuery<ProductType[]>({
            queryKey: ["favorites", user_id], // Include userId in the query key to refetch when it changes
            queryFn: () => getUserFavoriteProducts(user_id), // Fetch favorite products for the user  
            enabled: !!user_id // fetch only when there is user
      });
};

// mutation for adding a product to favorites
export const useAddFavoriteProducts = () => {
      const queryClient = useQueryClient();

      return useMutation<NormalApiResponse, Error, { userId: number; productId: number }>({
            mutationFn: ({ userId, productId }: { userId: number; productId: number }) =>
                  addUserFavoriteProduct(userId, productId),
            onSuccess: (data, variables) => {
                  queryClient.invalidateQueries({ queryKey: ["favorites", variables.userId] });

                  toast.success(data.message);
                  PlaySound();
            },
      });
};