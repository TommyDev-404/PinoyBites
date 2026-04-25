import { prisma } from "../../lib/prisma";
import { UpdateProfileType } from "../../validators/user/account.validators";

export const getUserAccountInfo = async (userId: number) => {
      return await prisma.users.findUnique({ // returns array
            where: { user_id: userId, role: 'user' },
            select: {
                  user_id: true,
                  username: true,
                  email: true,
                  address: true,
                  contact_num: true,
                  profile_image: true,
                  role: true
            }
      });
};

export const updateUserAccount = async (userId: number, updateData: UpdateProfileType) => {
      return await prisma.users.update({
            where: { user_id: userId },
            data: {
                  ...updateData,
            },
            select: {
                  user_id: true,
                  username: true,
                  email: true,
                  address: true,
                  contact_num: true,
                  profile_image: true,
            },
      });
};
