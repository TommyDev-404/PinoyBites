import { Request, Response } from "express";
import { checkIfUserCanRate, createNewRating } from "../../services/user/rating.services";
import { CanUserRateSchema, RateSystemExperienceSchema } from "../../validators/user/rating.validator";

export const rateSystemExperience = async(req: Request, res: Response) => {
      const parsed = RateSystemExperienceSchema.safeParse(req.body);
      if (!parsed.success) {
            return res.status(400).json({ message: "Invalid params", errors: parsed.error.issues });
      }

      const { userId, rating, comment } = parsed.data;

      try{
            const userAlreadyRated = await checkIfUserCanRate(userId); 
            if (userAlreadyRated) {
                  return res.status(500).json({
                        success: false,
                        message: "You have already rated this month."
                  });
            }

            // Save rating
            const newRating = await createNewRating(userId, rating, comment);
            
            return res.status(200).json({
                  success: true,
                  rating: newRating,
            });
      }catch (err) {
            console.error(err);
            res.status(500).json({ message: "Failed to rate." });
      }
};

export const canUserRate = async(req: Request, res: Response) => {
      const parsed = CanUserRateSchema.safeParse(req.params);
      if (!parsed.success) {
            return res.status(400).json({ message: "Invalid params", errors: parsed.error.issues });
      }

      const {userId } = parsed.data;

      try{
            const userAlreadyRated = await checkIfUserCanRate(userId);
            res.status(200).json({ canRate: userAlreadyRated ? false : true })
      }catch (err) {
            console.error(err);
            res.status(500).json({ message: "Failed to check user rating status" });
      }
}
