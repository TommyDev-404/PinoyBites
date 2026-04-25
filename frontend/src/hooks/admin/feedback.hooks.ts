
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { AdminGetAllFeedbackResponse, AdminGetFeedbackStatisticsResponse, NormalApiResponse } from "@/types/api-response.types";
import { getAllFeedback, getFeedbackStatistics, replyUserFeedback, toggleReviewFeatured } from "@/services/admin/feedback.services";
import type { FeedbackFilter, FeedbackSort } from "@/types/user/feedback.types";
import toast from "react-hot-toast";
import { PlaySound } from "@/utils/PlaySound";


export const useAdminFeedbackStatistics = () => {
      return useQuery<AdminGetFeedbackStatisticsResponse>({
            queryKey: ["adminFeedbackStatistics"], 
            queryFn:  getFeedbackStatistics, 
      });
};

export const useAdminGetFeedback = (filter: FeedbackFilter, sort: FeedbackSort) => {
      return useQuery<AdminGetAllFeedbackResponse>({
            queryKey: ["adminFeedbacks", filter, sort], 
            queryFn:  () => getAllFeedback(filter, sort), 
      });
};

export const useAdminReplyFeedback= (onClose: () => void) => {
      const queryClient = useQueryClient();

      return useMutation<NormalApiResponse, Error, { review_id: number, reply: string }>({
            mutationFn: async ({ review_id, reply }) => replyUserFeedback(review_id, reply),
            onSuccess: (data, variables) => {
                  queryClient.invalidateQueries({ queryKey: ["adminFeedbacks"] });
                  toast.success(data.message);
                  PlaySound();
                  onClose();
            },
      });   
};

export const useAdminToggleFeaturedReview = () => {
      const queryClient = useQueryClient();

      return useMutation<NormalApiResponse, Error, { review_id: number }>({
            mutationFn: async ({ review_id }) => toggleReviewFeatured(review_id),
            onSuccess: (data, variables) => {
                  queryClient.invalidateQueries({ queryKey: ["adminFeedbacks"] });
                  toast.success(data.message);
                  PlaySound();
            },
      });   
};

