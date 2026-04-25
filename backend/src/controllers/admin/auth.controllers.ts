import { Request, Response } from 'express';
import { comparePassword } from '../../utils/password.util';
import { signToken } from '../../utils/jwt.util';
import { findAdminAccount } from '../../services/admin/auth.services';
import { LoginAdminSchema } from '../../validators/admin/auth.validators';

export const loginAdmin = async(req: Request, res: Response) => {
      const parsed = LoginAdminSchema.safeParse(req.body);
      
      if (!parsed.success) {
            console.log(parsed.error.format());
            return res.status(400).json({ message: "Invalid request", errors: parsed.error.issues });
      }

      const { username, password } = parsed.data;

      try{
            const admin = await findAdminAccount(username);
            if (!admin) return res.status(400).json({ message: 'Invalid admin credentials!'});

            const passwordMatch = comparePassword(password, admin.password);
            if (!passwordMatch)  return res.status(400).json({ message: 'Invalid admin credentials!'});
            
            // Generate token for admin
            const token = signToken({ id: admin.user_id, username: admin.username, role: admin.role }, 7 * 24 * 60 * 60);
            
            // sign the access token
            res.cookie('token', token, {
                  httpOnly: true,
                  sameSite: 'lax',
                  maxAge: 7 * 24 * 60 * 60 * 1000
            })

            res.status(200).json({ 
                  success: true,
                  message: "Logged in successfully!",
                  user: {
                        user_id: admin.user_id,
                        username: admin.username,
                        email: admin.email,
                        role: admin.role
                  }
            });
      }catch(err){
            res.status(500).json({ message: 'Server error', error: err });
      }
};

export const logoutAdmin = async (req: Request, res: Response) => {
      res.cookie("token", "", {
            httpOnly: true,
            sameSite: "lax",
            maxAge: 0, // expire immediately
      });
      
      res.json({ success: true, message: "Logged out successfully!" });
};