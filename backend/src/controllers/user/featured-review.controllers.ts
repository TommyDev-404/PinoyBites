import { Request, Response } from "express";
import { getCustomerReviews, getEachRatingPercentage, getReviewsStatistics } from "../../services/user/featured-review.services";
import { success } from "zod";

export const customerReviews = async (req: Request, res: Response) => {
      try {
            // 1. Fetch all reviews for all products (or system-wide if it's a general feedback)
            const reviews = await getCustomerReviews();

            // 2. Aggregate overall rating system-wide
            const stats = await getReviewsStatistics();
            const totalReviews = stats._count.rating || 0;

            // 3. Star distribution percentages
            const starDistribution = await getEachRatingPercentage();
            const starPercentage = starDistribution.map(star => ({
                  rating: star.rating,
                  percentage: totalReviews > 0 ? (star._count.rating / totalReviews) * 100 : 0,
            }));

            res.status(200).json({
                  success: true,
                  message: "Top reviews successfully retrieved!",
                  payload: {
                        overall_rating: stats._avg.rating ?? 0, // e.g., 4.6
                        total_reviews: totalReviews,                          // e.g., 125 reviews
                        star_percentage: starPercentage,                        // e.g., 5⭐:60%, 4⭐:28%, etc.
                        reviews                              // latest reviews to display
                  }
            });
      } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Failed to fetch customer reviews" });
      }
};