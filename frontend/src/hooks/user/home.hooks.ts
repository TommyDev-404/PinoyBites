import { useQuery } from "@tanstack/react-query";
import { getFeaturedProducts } from "@/services/user/products.services";
import type { GetFeaturedCustomerReviewsResponse, GetProductsInfo } from "@/types/api-response.types";
import { getFeaturedReviews } from "@/services/user/featured-reviews.services";

export const useFeaturedProducts = () => {
      return useQuery<GetProductsInfo>({
            queryKey: ["featuredProducts"],
            queryFn:  getFeaturedProducts, 
      });
};

export const useFeaturedReviews = () => {
      return useQuery<GetFeaturedCustomerReviewsResponse>({
            queryKey: ["featuredReviews"], 
            queryFn:  getFeaturedReviews,
      });
};