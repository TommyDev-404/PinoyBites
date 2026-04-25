import type { GetFeaturedCustomerReviewsResponse  } from "@/types/api-response.types";
import api from "../axios";

export const getFeaturedReviews = async (): Promise<GetFeaturedCustomerReviewsResponse> => {
      try {
            const response = await api.get<GetFeaturedCustomerReviewsResponse>(`/reviews/get`);
            return response.data;
      } catch (error: any) {
            // Handle error properly
            if (error.response) {
                  // Backend responded with an error
                  throw new Error(error.response.data.message || "Failed to fetch featured reviews.");
            } else {
                  // Network error or other
                  throw new Error(error.message || "Failed to fetch featured reviews.");
            }
      }
};
