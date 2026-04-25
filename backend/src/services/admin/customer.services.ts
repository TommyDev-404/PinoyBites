// services/rating.service.ts
import { prisma } from "../../lib/prisma";
import { getIO } from "../../lib/socket.lib";
import { sendEmail } from "../../utils/mail.utils";

export const getCustomerStatistics = async () => {
      const users = await prisma.users.findMany({
            where: { role: 'user' },
            select: {
                  user_id: true
            }
      });

      const total = users.length;

      const bannedUsers = await prisma.user_bans.findMany({
            where: {
                  user_id: { in: users.map(u => u.user_id) }
            },
            select: { user_id: true }
      });

      const bannedSet = new Set(bannedUsers.map(b => b.user_id));

      const banned = bannedSet.size;
      const active = total - banned;

      return { total, active, banned };
};

export const getAllCustomersInfo = async () => {
      // 1. Get stats per user
      const stats = await prisma.orders.groupBy({
            by: ['user_id'],
            _count: { order_id: true },
            _sum: { total_price: true },
      });

      // 2. Get users
      const users = await prisma.users.findMany({
            where: { role: "user"},
            select: { 
                  profile_image: true,
                  address: true,
                  user_id: true, 
                  username: true, 
                  email: true, 
                  contact_num: true, 
                  loyalty_tier: true
            },
            orderBy: { created_at: 'desc' }
      });

      // 3. Get banned users
      const bannedUsers = await prisma.user_bans.findMany({
            where: { 
                  user_id: { in: users.map(u => u.user_id) }
            },
            select: { user_id: true }
      });
      const bannedSet = new Set(bannedUsers.map(b => b.user_id));

      // 4. Combine everything
      return users.map(u => {
            const stat = stats.find(s => s.user_id === u.user_id);
            return {
                  ...u,
                  total_orders: stat?._count.order_id ?? 0,
                  total_spent: stat?._sum.total_price ?? 0,
                  account_status: bannedSet.has(u.user_id) ? 'Banned' : 'Active'
            };
      });
};

export const getCustomersOrderHistory = async (user_id: number) => {
      return prisma.orders.findMany({
            where: { user_id },
            select: { 
                  order_id: true,
                  order_date: true,
                  promo_code: true,
                  status: true,

                  order_items: {
                        select: {
                              name: true,
                              quantity: true,
                        }
                  }
            },
      });
};

export const banCustomer = async (user_id: number, reason: string, durationDays: number) => {
      const bannedUntil = new Date();
      bannedUntil.setDate(bannedUntil.getDate() + durationDays);

      const ban = await prisma.user_bans.create({
            data: {
                  user_id,
                  reason,
                  banned_at: new Date(),
                  expires_at: bannedUntil,
            }
      });

      const user = await prisma.users.findUnique({
            where: { user_id },
            select: {
                  user_id: true,
                  email: true, 
                  username: true
            },
      });

      if (!user) {
            throw new Error("User not found");
      }

      /*
      await sendEmail(
            user.email,
            "Your Account Has Been Banned",
            `Hello ${user.username},
            
            We regret to inform you that your account has been temporarily banned.
            
            Reason: ${reason}
            
            Duration: ${durationDays} day(s)
            
            During this time, you will not be able to log in or access your account. Please contact support if you believe this was a mistake.
            
            Best regards,
            The Team`
      );
      */

      const io = getIO();
      io.to(`user_${user_id}`).emit("user_banned", { reason, user_id: user.user_id });

      return ban;
};

export const unbanCustomer = async (user_id: number, reason: string) => {
      const user = await prisma.users.findUnique({
            where: { user_id },
            select: { 
                  user_id: true,
                  email: true, 
                  username: true
            },
      });

      if (!user) {
            throw new Error("User not found");
      }

      const result = await prisma.user_bans.deleteMany({
            where: { user_id },
      });

      /*
      await sendEmail(
            user.email,
            "Your Account Has Been Unbanned",
            `Hello ${user.username},

            Your account has been unbanned. 

            Reason: ${reason}

            You can now log in and use your account as usual.

            Best regards,
            The Team`
      );
      */
      
      const io = getIO();
      io.to(`user_${user_id}`).emit("user_unbanned", user_id);

      return result; // returns number of records deleted
};