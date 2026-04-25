import { Request, Response } from 'express';
import { hashPassword, comparePassword } from '../../utils/password.util';
import { signToken, verifyToken } from '../../utils/jwt.util';
import { LoginSchema, RegisterSchema, UpdatePasswordSchema, VerifyCodeSchema, VerifyEmailSchema } from '../../validators/user/auth.validators';
import { createUserAccount, findUserEmail, isUserBand, sendRecoveryCode, updatePassword, validateRecoveryCode } from '../../services/user/auth.services';
import { JwtPayload } from 'jsonwebtoken';


export const register = async (req: Request, res: Response) => {
      const parsed = RegisterSchema.safeParse(req.body);
      if (!parsed.success) {
            return res.status(400).json({ message: "Invalid body", errors: parsed.error.issues });
      }

      const { 
            username,
            email, 
            contact,
            address,
            password 
      } = parsed.data;

      try {
            const existingUser = await findUserEmail(email);
            if (existingUser) return res.status(400).json({ message: 'Email already exists' });

            const hash_pass = await hashPassword(password);

            const user = await createUserAccount({
                  username,
                  email,
                  contact,
                  address,
                  password,
                  hash_pass
            });

            const accessToken = signToken({ id: user.user_id, email: user.email }, 15 * 60 * 1000);  // 15 minutes
            const refreshToken = signToken({ id: user.user_id, email: user.email }, 7 * 24 * 60 * 60); // 7 days expiration

            // sign the access token
            res.cookie('token', accessToken, {
                  httpOnly: true,
                  sameSite: 'lax',
                  maxAge: 15 * 60 * 1000
            })
            
            // sign the refresh token
            res.cookie('refreshToken', refreshToken, {
                  httpOnly: true,
                  sameSite: 'lax',
                  maxAge: 7 * 24 * 60 * 60
            })

            res.status(201).json({ 
                  success: true,
                  message: 'Account created successfully!',
                  user
            });
      } catch (err) {
            res.status(500).json({ message: 'Server error', error: err });
      }
};

export const login = async (req: Request, res: Response) => {
      const parsed = LoginSchema.safeParse(req.body);

      if (!parsed.success) {
            return res.status(400).json({ message: "Invalid params", errors: parsed.error.issues });
      }

      const { email, password } = parsed.data;

      try {
            const user = await findUserEmail(email);
            if (!user) return res.status(400).json({ message: 'Invalid credentials' });

            const isBanned = await isUserBand(user.user_id);
            if (isBanned) return res.status(403).json({ message: 'This account is banned.' });

            const isMatch = await comparePassword(password, user.hash_pass); // compare user plain pass and stored hash password
            if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

            const accessToken = signToken({ id: user.user_id, email: user.email }, 5 * 60 );  // 5 minutes
            const refreshToken = signToken({ id: user.user_id, email: user.email }, 7 * 24 * 60 * 60); // 7 days expiration

            // sign the access token
            res.cookie('token', accessToken, {
                  httpOnly: true,
                  sameSite: 'lax',
                  maxAge: 5 * 60 * 1000
            })
            
            // sign the refresh token
            res.cookie('refreshToken', refreshToken, {
                  httpOnly: true,
                  sameSite: 'lax',
                  maxAge: 7 * 24 * 60 * 60
            })

            res.status(200).json({ 
                  success: true,
                  message: 'Login successfully!',
                  user: {
                        user_id: user.user_id,
                        username: user.username,
                        email: user.email,
                        profile_image: user.profile_image,
                        role: user.role,
                        address: user.address,
                        contact_num: user.contact_num
                  }
            });
      } catch (err) {
            res.status(500).json({ message: 'Server error', error: err });
      }
};

export const verifyEmail = async (req: Request, res: Response) => {
      const parsed = VerifyEmailSchema.safeParse(req.body);
      if (!parsed.success) {
            return res.status(400).json({ message: "Invalid body", errors: parsed.error.issues });
      }

      const { email } = parsed.data;

      try {
            const existingUser = await findUserEmail(email);
            if (!existingUser) return res.status(400).json({ message: 'Email dont exists!' });

            await sendRecoveryCode(existingUser.user_id,email);
            
            res.status(201).json({ 
                  success: true,
                  message: 'We`ve sent you a recovery code in your email. Please check!',
                  user_id: existingUser.user_id
            });
      } catch (err) {
            res.status(500).json({ message: 'Server error', error: err });
      }
};

export const verifyCode = async (req: Request, res: Response) => {
      const parsed = VerifyCodeSchema.safeParse(req.body);
      
      if (!parsed.success) {
            return res.status(400).json({ message: "Invalid body", errors: parsed.error.issues });
      }

      const { user_id, code } = parsed.data;

      try {
            const codeValid = await validateRecoveryCode(user_id, code);
            if (!codeValid.valid) return res.status(400).json({ message: codeValid.reason });

            res.status(201).json({ 
                  success: true,
                  message: codeValid.reason,
            });
      } catch (err) {
            res.status(500).json({ message: 'Server error', error: err });
      }
};

export const changePassword = async (req: Request, res: Response) => {
      const parsed = UpdatePasswordSchema.safeParse(req.body);
      if (!parsed.success) {
            return res.status(400).json({ message: "Invalid body", errors: parsed.error.issues });
      }

      const { user_id, password } = parsed.data;

      try {
            const updated = await updatePassword(user_id, password);

            res.status(201).json({ 
                  success: true,
                  message: 'Password changed successfully!',
            });
      } catch (err) {
            res.status(500).json({ message: 'Failed to update password.', error: err });
      }
};

export const getNewToken = async (req: Request, res: Response) => {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) return res.status(401).json({ message: "Unauthorized" });

      try {
            const payload = verifyToken(refreshToken) as JwtPayload;

            // Issue new access token
            const newToken = signToken({ id: payload.id }, 15 * 60);
      
            res.cookie("token", newToken, {
                  httpOnly: true,
                  secure: process.env.NODE_ENV === "production",
                  sameSite: "lax",
                  maxAge: 15 * 60 * 1000
            });
      
            res.json({ success: true, message: "Access token refreshed" });
      } catch {
            res.status(401).json({ message: "Invalid refresh token" });
      }
};

export const logout = async (req: Request, res: Response) => {
      res.cookie("token", "", {
            httpOnly: true,
            sameSite: "lax",
            maxAge: 0, // expire immediately
      });

      res.cookie("refreshToken", "", {
            httpOnly: true,
            sameSite: "lax",
            maxAge: 0, // expire immediately
      });
      
      res.json({ success: true, message: "Logged out successfully!" });
};
