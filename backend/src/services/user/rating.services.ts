// services/rating.service.ts
import { prisma } from "../../lib/prisma";

export const checkIfUserCanRate = async (userId: number) => {
      const now = new Date();

      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

      return await prisma.reviews.findFirst({
            where: {
                  user_id: userId,
                  created_at: {
                        gte: startOfMonth,
                        lte: endOfMonth,
                  },
            },
      });
};

export const createNewRating = async (userId: number, rating: number, comment: string) => {
      // Save rating
      return await prisma.reviews.create({
            data: {
                  user_id: userId,
                  rating: rating,
                  comment,
                  type: 'system'
            },
      });
};

