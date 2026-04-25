import { prisma } from "../../lib/prisma";

export const getCustomerReviews = async () => {
      const reviews = await  prisma.reviews.findMany({
            where: { is_featured_review: true },
            select: {
                  users: {
                        select: {
                              username: true
                        }
                  },
                  rating: true,
                  comment: true,
                  created_at: true,
            },
            orderBy: { created_at: "desc" },
            take: 6
      });

      return reviews;
};

export const getReviewsStatistics = async() => {
      return await prisma.reviews.aggregate({
            _avg: { rating: true },
            _count: { rating: true },
      });
};

export const getEachRatingPercentage = async() => {
      return await prisma.reviews.groupBy({
            by: ["rating"],
            _count: { rating: true },
      });
};
