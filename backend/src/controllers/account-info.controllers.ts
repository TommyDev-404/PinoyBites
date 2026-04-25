import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { verifyToken } from "../utils/jwt.util";
import { JwtPayload } from "jsonwebtoken";

export interface AuthRequest extends Request {
      user?: JwtPayload;
}

export const accountInfoController = async (req: AuthRequest, res: Response) => {
      try {
            // 1. Get token from cookie or header
            const token = req.cookies.token;

            if (!token) {
                  return res.status(401).json({ message: "Unauthorized" });
            }

            // 2. Decode token
            const decoded = verifyToken(token) as JwtPayload;

            // 3. Fetch user (admin or normal user)
            const user = await prisma.users.findUnique({
                  where: { user_id: decoded.id },
                  select: {
                        user_id: true,
                        role: true, // 👈 IMPORTANT (admin or user)
                  },
            });

            if (!user) {
                  return res.status(404).json({ message: "User not found" });
            }

            // 4. Return SAME shape for both admin and user
            return res.json({
                  success: true,
                  message: "Current user retreive successfully!",
                  user
            });

      } catch (err) {
            return res.status(401).json({ message: "Invalid token" });
      }
};