import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addToCart, getCartItems, getUserValidPromo, removeCartItem, updateCartItem } from "@/services/user/cart.services";
import type { GetCartsApiResponse, NormalApiResponse, UserPromoReceivedResponse } from "@/types/api-response.types";
import { PlaySound } from "@/utils/PlaySound";
import toast from "react-hot-toast";

export const useCarts = (user_id: number) => {
      return useQuery<GetCartsApiResponse>({
            queryKey: ["carts", user_id], // Include filters in the query key to refetch when they change
            queryFn: () => getCartItems(user_id), // Fetch products with the provided filters
            enabled: !!user_id
      });
};

export const useUserPromo = (user_id: number) => {
      return useQuery<UserPromoReceivedResponse>({
            queryKey: ["validPromo", user_id], // Include filters in the query key to refetch when they change
            queryFn: () => getUserValidPromo(user_id), // Fetch products with the provided filters
            enabled: !!user_id
      });
};

// mutation for adding a product to favorites
export const useAddToCart = () => {
      const queryClient = useQueryClient();

      return useMutation<NormalApiResponse, Error, { user_id: number; product_id: number; quantity: number }>({
            mutationFn: ({ user_id, product_id, quantity }: { user_id: number; product_id: number; quantity: number }) =>
                  addToCart(user_id, product_id, quantity),
            onSuccess: (_, variables) => {
                  queryClient.invalidateQueries({ queryKey: ["carts", variables.user_id] });

                  toast.success('Item added to cart');
                  PlaySound();
            },
      });
};

export const useUpdateCartItem = () => {
      const queryClient = useQueryClient();

      return useMutation<NormalApiResponse, Error, { user_id: number; product_id: number; quantity: number }>({
            mutationFn: ({ user_id, product_id, quantity }: { user_id: number; product_id: number; quantity: number }) =>
                  updateCartItem(user_id, product_id, quantity),
            onSuccess: (_, variables) => {
                  queryClient.invalidateQueries({ queryKey: ["carts", variables.user_id] });
            },
      });
};

export const useRemoveCartItem = () => {
      const queryClient = useQueryClient();

      return useMutation<NormalApiResponse, Error, { user_id: number; product_id: number }>({
            mutationFn: ({ user_id, product_id }: { user_id: number; product_id: number }) =>
                  removeCartItem(user_id, product_id),
            onSuccess: (_, variables) => {
                  queryClient.invalidateQueries({ queryKey: ["carts", variables.user_id] });
                  
                  toast.success('Item removed from cart');
                  PlaySound();
            },
      });
};
