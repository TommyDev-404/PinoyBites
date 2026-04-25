import { Request, Response } from "express";
import { AuthRequest } from "../../middleware/auth.middleware";
import { UpdateProfileBodySchema, UserIDSchema } from "../../validators/user/account.validators";
import { getUserAccountInfo, updateUserAccount } from "../../services/user/account.services";

export const accountInfo = async (req: AuthRequest, res: Response) => {
      try {
            const userId = req.user!.id;
            const userAccountInfo = await getUserAccountInfo(userId);
            
            res.status(200).json({
                  success: true,          // always indicates if request succeeded
                  message: "Fetched user account info successfully", // optional, human-readable
                  user: userAccountInfo   // the actual payload
            });
      } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Failed to fetch user account info" });
      }
};

export const updateProfile = async (req: Request, res: Response) => {
      // 1. Validate route params
      const parsedQuery = UserIDSchema.safeParse(req.query);
      if (!parsedQuery.success) {
            return res.status(400).json({ message: "Invalid params", errors: parsedQuery.error.issues });
      }

      // 2. Validate request body
      const bodyParse = UpdateProfileBodySchema.safeParse(req.body);
      if (!bodyParse.success) {
            return res.status(400).json({ message: "Invalid body", errors: bodyParse.error.issues });
      }

      const userId = parsedQuery.data.user_id;
      const updateData = bodyParse.data; // contains only the fields provided

      try {
            const updatedUser = await updateUserAccount(userId, updateData);
            res.status(200).json({ message: "Profile updated successfully", user: updatedUser });
      } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Failed to update profile" });
      }
};