import { Request, Response } from "express";
import { getAllFeedbacks, getFeedbackStatistics, replyFeedback, toggleReviewFeatured } from "../../services/admin/feedback.services";
import { GetAllFeedbackSchema, MarkFeaturedFeedbackSchema, ReplyFeedbackSchema } from "../../validators/admin/feedback.validators";

export const feedbackStatistics = async (req: Request, res: Response) => {
      try {
            const statistics = await getFeedbackStatistics();

            res.status(200).json({
                  success: true,
                  message: 'Statistics retrieve successfully!',
                  statistics
            });
      } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Failed to fetch all customers." });
      }
};

export const allFeedbacks = async (req: Request, res: Response) => {
      const parsed = GetAllFeedbackSchema.parse(req.query);

      const { filter, sort } = parsed;
      try {
            const feedbacks = await getAllFeedbacks(filter, sort);

            res.status(200).json({
                  success: true,
                  message: 'All feedbacks retrieve successfully!',
                  feedbacks
            });
      } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Failed to fetch all customers." });
      }
};

export const replyUserFeedback = async (req: Request, res: Response) => {
      const parsed = ReplyFeedbackSchema.parse(req.body);

      const { review_id, reply } = parsed;
      try {
            await replyFeedback(review_id, reply);

            res.status(200).json({
                  success: true,
                  message: 'Feedback replied successfully!',
            });
      } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Failed to fetch all customers." });
      }
};

export const toggleAsFeatured = async (req: Request, res: Response) => {
      const parsed = MarkFeaturedFeedbackSchema.parse(req.query);

      const { review_id } = parsed;
      try {
            const isFeatured = await toggleReviewFeatured(review_id);

            res.status(200).json({
                  success: true,
                  message: isFeatured ? "Review featured!" : "Feature removed!",
            });
      } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Failed to marked as featured." });
      }
};