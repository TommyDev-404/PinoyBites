import { prisma } from "../../lib/prisma";
import { sendEmail } from "../../utils/mail.utils";
import { hashPassword } from "../../utils/password.util";
import { RegisterType } from "../../validators/user/auth.validators";

export const findUserEmail = async(email: string) => {
      return await prisma.users.findUnique({ 
            where: { email: email },
      })
};    

export const isUserBand = async(user_id: number) => {
      return await prisma.user_bans.findFirst({ 
            where: {
                  user_id,
                  expires_at: { gte: new Date() } // still active ban
            }
      })
};    

export const createUserAccount = async(data: RegisterType) => {
      return await prisma.users.create({
            data: { 
                  username: data.username, 
                  email: data.email, 
                  contact_num: data.contact,
                  address: data.address,
                  password: data.password, 
                  hash_pass: data.hash_pass!,
                  profile_image: 'None',
                  role: 'user',
            },
      });
};    

export const sendRecoveryCode = async (user_id: number, email: string) => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();

      await prisma.password_resets.create({
            data: {
                  user_id,
                  code,
                  expires_at: new Date(Date.now() + 15 * 60 * 1000), // 15 min expiry
                  used: false,
            },
      });

    // Send the code via email
      await sendEmail(
                  email,
                  "Your Password Recovery Code",
                  `Your recovery code is: ${code}. It will expire in 15 minutes.`
      );

      return code;
};

export const validateRecoveryCode = async (user_id: number, code: string) => {
      // 1️⃣ Find any code for this user
      const record = await prisma.password_resets.findFirst({
            where: {
                  user_id,
                  code: code,
            },
      });

      if (!record) {
            // Code does not exist → incorrect
            return { valid: false, reason: "Incorrect code!" };
      }

      if (record.used) {
            return { valid: false, reason: "Code already used!" };
      }

      if (record.expires_at < new Date()) {
            return { valid: false, reason: "Code expired!" };
      }

      // ✅ Code is valid → optionally mark it used
      await prisma.password_resets.update({
            where: { id: record.id },
            data: { used: true },
      });

      return { valid: true, reason: "Recovery code is valid!" };
};

export const updatePassword = async (user_id: number, newPassword: string) => {
      const hashedPassword = await hashPassword(newPassword);

      // 2. Update in the database
      const updatedUser = await prisma.users.update({
            where: { user_id },
            data: { 
                  password:  newPassword,
                  hash_pass: hashedPassword
            },
      });

      return updatedUser;
};

