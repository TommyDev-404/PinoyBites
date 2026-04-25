import type { 
      AdminGetAllFeedbackResponse,
      AdminGetFeedbackStatisticsResponse,
      NormalApiResponse
} from "@/types/api-response.types";
import api from "../axios";
import type { FeedbackFilter, FeedbackSort } from "@/types/user/feedback.types";

export const getFeedbackStatistics= async (): Promise<AdminGetFeedbackStatisticsResponse> => {
      try {
            const response = await api.get<AdminGetFeedbackStatisticsResponse>(`/admin/feedbacks/statistics`);
            return response.data;
      } catch (error: any) {
            // Handle error properly
            if (error.response) {
                  // Backend responded with an error
                  throw new Error(error.response.data.message || "Failed to retrieve statistics");
            } else {
                  // Network error or other
                  throw new Error(error.message || "Failed to retrieve statistics");
            }
      }
};

export const getAllFeedback= async (filter: FeedbackFilter, sort: FeedbackSort): Promise<AdminGetAllFeedbackResponse> => {
      try {
            const response = await api.get<AdminGetAllFeedbackResponse>(`/admin/feedbacks/get`, { params: { filter, sort }});
            return response.data;
      } catch (error: any) {
            // Handle error properly
            if (error.response) {
                  // Backend responded with an error
                  throw new Error(error.response.data.message || "Failed to retrieve all feedbacks");
            } else {
                  // Network error or other
                  throw new Error(error.message || "Failed to retrieve all feedbacks");
            }
      }
};

export const replyUserFeedback= async (review_id: number, reply: string): Promise<NormalApiResponse> => {
      try {
            const response = await api.post<NormalApiResponse>(`/admin/feedbacks/reply`, { review_id, reply });
            return response.data;
      } catch (error: any) {
            // Handle error properly
            if (error.response) {
                  // Backend responded with an error
                  throw new Error(error.response.data.message || "Failed to reply feedbacks");
            } else {
                  // Network error or other
                  throw new Error(error.message || "Failed to reply feedbacks");
            }
      }
};

export const toggleReviewFeatured= async (review_id: number): Promise<NormalApiResponse> => {
      try {
            const response = await api.put<NormalApiResponse>(`/admin/feedbacks/marked-featured`, {}, { params: { review_id }});
            return response.data;
      } catch (error: any) {
            // Handle error properly
            if (error.response) {
                  // Backend responded with an error
                  throw new Error(error.response.data.message || "Failed to marked featured feedbacks");
            } else {
                  // Network error or other
                  throw new Error(error.message || "Failed to  marked featured feedbacks");
            }
      }
};