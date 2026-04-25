// services/rating.service.ts
import { prisma } from "../../lib/prisma";
import { getIO } from "../../lib/socket.lib";
import { FeedbackFilter, FeedbackSort } from "../../validators/admin/feedback.validators";

export const getFeedbackStatistics = async () => {
      const [
            totalStats,
            goodFeedback,
            badFeedback,
            users
      ] = await Promise.all([
            // total + avg
            prisma.reviews.aggregate({
                  _count: { _all: true },
                  _avg: { rating: true },
            }),
      
            // good feedback (>= 4)
            prisma.reviews.count({
                  where: { rating: { gte: 4 } },
            }),
      
            // bad feedback (<= 2)
            prisma.reviews.count({
                  where: { rating: { lte: 2 } },
            }),
      
            // unique users
            prisma.reviews.findMany({
                  select: { user_id: true },
                  distinct: ["user_id"],
            }),
      ]);

      const totalFeedback = totalStats._count._all;
      const avgRating = Number(totalStats._avg.rating) || 0;

      return {
            total_feedback: totalFeedback,
            avg_rating: avgRating,
            good_feedback: goodFeedback,
            bad_feedback: badFeedback,
            user_rated_count: users.length,
      };
};

export const getAllFeedbacks = async ( filter: FeedbackFilter = "all", sort: FeedbackSort = "newest" ) => {
      const feedbacks = await prisma.reviews.findMany({
            where: {
                  ...(filter !== "all" && { type: filter }), // "product" | "system"
            },
            include: {
                  users: {
                        select: {
                              username: true,
                        },
                  },
            },
      });

      const mergedFeedbacks = feedbacks.map((fb: any) => ({
            review_id: fb.review_id,
            category: fb.type === "product" ? "Product" : "System",
            rating: fb.rating,
            comment: fb.comment,
            created_at: fb.created_at,
            username: fb.users.username,
            is_replied: fb.is_replied,
            is_featured_review: fb.is_featured_review,
            status:
                  Number(fb.rating) >= 4
                        ? "Good"
                        : Number(fb.rating) <= 2
                        ? "Bad"
                        : "Neutral",
      }));

      switch (sort) {
            case "oldest":
                  mergedFeedbacks.sort(
                        (a, b) =>
                        new Date(a.created_at).getTime() -
                        new Date(b.created_at).getTime()
                  );
            break;
      
            case "newest":
                  mergedFeedbacks.sort(
                        (a, b) =>
                        new Date(b.created_at).getTime() -
                        new Date(a.created_at).getTime()
                  );
            break;
      
            case "rating":
            default:
                  mergedFeedbacks.sort((a, b) => b.rating - a.rating);
            break;
      }

      return mergedFeedbacks;
};

export const replyFeedback = async ( review_id: number, reply: string ) => {
      // 1. Get the review (to know which user to notify)
      const review = await prisma.reviews.findUnique({
            where: { review_id },
            select: {
                  user_id: true,
                  comment: true,
            },
      });

      if (!review) {
            throw new Error("Review not found");
      }

      // 2. Save reply
      const repliedFeedback = await prisma.feedback_replies.create({
            data: {
                  review_id,
                  reply,
            },
      });
      
      // 3. Mark as replied
      await prisma.reviews.update({
            where: { review_id },
            data: {
                  is_replied: true,
            }
      });

      // 4. Create notification
      await prisma.notifications.create({
            data: {
                  user_id: review.user_id,
                  notif_type: "admin_feedback",
                  target_role: "user",
                  message: "Admin has replied to your feedback. Click to view.",
                  reply_id: repliedFeedback.reply_id, // optional but recommended
            },
      });

      return repliedFeedback;
};

export const toggleReviewFeatured = async (review_id: number) => {
      const review = await prisma.reviews.findUnique({
            where: { review_id },
            select: {
                  review_id: true,
                  is_featured_review: true,
            },
      });

      if (!review) {
            throw new Error("Review not found");
      }

      const updatedReview = await prisma.reviews.update({
            where: { review_id },
            data: {
                  is_featured_review: !review.is_featured_review,
            },
      });

      return updatedReview.is_featured_review;
};