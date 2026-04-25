import { Request, Response } from "express";
import { getAdminNotificationCount, getAllAdminNotification, markNotificationAsRead } from "../../services/admin/notification.services";
import { MarkNotifAsReadSchema } from "../../validators/admin/notification.validators";

export const allAdminNotifications = async (req: Request, res: Response) => {
      try{
            const notifications = await getAllAdminNotification();
            
            res.status(200).json({ 
                  success: true,
                  message: "All admin notifications retrieve successfully!",
                  notifications
            });
      }catch(err){
            console.error(err);
            res.status(500).json({ message: "Failed to retrieve all admin notifications." });
      }
};

export const notificationCount = async (req: Request, res: Response) => {
      try{
            const count = await getAdminNotificationCount();
            
            res.status(200).json({ 
                  success: true,
                  message: "Notification count retrieve successfully!",
                  count
            });
      }catch(err){
            console.error(err);
            res.status(500).json({ message: "Failed to retrieve  notifications count." });
      }
};

export const markReadNotif = async (req: Request, res: Response) => {
      const parsed = MarkNotifAsReadSchema.safeParse(req.query);

      if (!parsed.success) {
            console.log(parsed.error.format());
            return res.status(400).json({ message: "Invalid query", errors: parsed.error.issues });
      }

      const { notif_id } = parsed.data;

      try{
            const updatedNotif = await markNotificationAsRead(notif_id);
            
            res.status(200).json({ 
                  success: true,
                  message: "Notifications marked read updated successfully!"
            });
      }catch(err){
            console.error(err);
            res.status(500).json({ message: "Failed to update order." });
      }
};

