import { prisma } from "../../lib/prisma";

export const findAdminAccount = async(username: string) => {
      return await prisma.users.findFirst({ 
            where: { 
                  role: 'admin',
                  username
            }, 
      });
};    