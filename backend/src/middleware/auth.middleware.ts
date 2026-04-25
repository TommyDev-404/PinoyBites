import { Request, Response, NextFunction } from 'express';
import { signToken, verifyToken } from '../utils/jwt.util';
import { JwtPayload } from 'jsonwebtoken';

export interface AuthRequest extends Request {
      user?: JwtPayload;
}

// Check if user is authenticated then they can proced to view that page/work the same into admin page
export const protect = (
      req: AuthRequest,
      res: Response,
      next: NextFunction
) => {
      const accessToken = req.cookies.token;
      const refreshToken = req.cookies.refreshToken;

      // 1. No tokens at all → unauthorized
      if (!accessToken && !refreshToken) {
            return res.status(401).json({ message: "Unauthorized" });
      }

      // 2. Try to verify access token first
      if (accessToken) {
      try {
            const decoded =verifyToken(accessToken) as JwtPayload;

            req.user = decoded;
            return next();
      } catch {
            // access token invalid or expired → try refresh token next
      }
      }

      // 3. If access token failed, try refresh token
      if (!refreshToken) {
            return res.status(401).json({ message: "Unauthorized" });
      }

      try {
            const decoded = verifyToken(refreshToken) as JwtPayload;

            // 4. Issue new access token
            const newAccessToken = signToken({ id: decoded.id, email: decoded.email }, 15 * 60 * 1000);

            // 5. Send new access token cookie
            res.cookie("token", newAccessToken, {
                  httpOnly: true,
                  secure: process.env.NODE_ENV === "production",
                  sameSite: "lax",
                  maxAge: 15 * 60 * 1000,
            });

            // 6. Attach user to request
            req.user = decoded;

            next();
      } catch {
            return res.status(401).json({ message: "Unauthorized" });
      }
};

// Check for the user credentials if it is admin then it can proceed to the admin content
export const adminOnly = (req: AuthRequest, res: Response, next: NextFunction) => {
      if (!req.user) return res.status(401).json({ message: 'Unauthorized' });

      if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Forbidden: Admins only' });
      }

      next();
};


