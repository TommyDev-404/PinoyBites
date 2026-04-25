import { prisma } from "../../lib/prisma";

export const getAllAdminNotification = async () => {
      // 1. Fetch notifications
      return  await prisma.notifications.findMany({
            where: { 
                  target_role: 'admin',
            },
            select: {
                  notif_id: true,
                  message: true,
                  is_read: true,
                  created_at: true,
                  notif_type: true
            },
            orderBy: {
                  created_at: 'desc'
            }
      });
};

export const markNotificationAsRead = async(notifId: number) => {
      return  await prisma.notifications.update({ // returns array
            where: { 
                  notif_id: notifId,
            },
            data: { is_read: true }
      });
};

export const getAdminNotificationCount = async () => {
      // 1. Fetch notifications
      return  await prisma.notifications.count({
            where: { 
                  target_role: 'admin',
                  is_read: false
            }
      });
};

