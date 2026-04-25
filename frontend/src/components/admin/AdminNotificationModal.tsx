import { useEffect, useState } from "react";
import {
      Dialog,
      DialogContent,
      DialogHeader,
      DialogTitle,
      DialogFooter,
      DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Bell, ShoppingBag, XCircle, UserPlus, Inbox } from "lucide-react";
import type { AdminNotificationsInfo, NotificationType } from "@/types/admin/notification.types";
import { useAdminAllNotifications, useAdminMarkNotifRead } from "@/hooks/admin/notification.hooks";
import { initSocket } from '@/lib/socket'; // your shared socket instance
import { timeAgo } from "@/utils/helper";

interface AdminNotificationsModalProps {
      open: boolean;
      onClose: () => void;
}

export default function AdminNotificationsModal({ open, onClose }: AdminNotificationsModalProps) {
      const { data: allNotifications, isLoading } = useAdminAllNotifications();
      const notifications = allNotifications?.notifications ?? [];

      const { mutate: markRead } = useAdminMarkNotifRead();

      const markAsRead = (notif_id: number) => {
            markRead({ notif_id });
      };

      const getIcon = (type: NotificationType) => {
            switch (type) {
                  case "new_order":
                        return <ShoppingBag className="text-blue-600" size={20} />;
                  case "order_cancelled":
                        return <XCircle className="text-red-500" size={20} />;
                  case "new_user":
                        return <UserPlus className="text-green-600" size={20} />;
                  default:
                        return <Bell size={20} />;
            }
      };

      return (
            <Dialog open={open} onOpenChange={onClose}>
                  <DialogContent className="sm:max-w-lg space-y-4">
                        <DialogHeader>
                              <DialogTitle>Notifications</DialogTitle>
                              <DialogDescription>
                                    Stay up-to-date with recent orders and user activity.
                              </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-2 max-h-96 overflow-y-auto">
                              {notifications.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center gap-2 py-4 text-gray-500">
                                          <Inbox size={24} />
                                          <p className="text-sm text-center">No new notifications</p>
                                    </div>
                              ) : (
                                    notifications.map((notif) => (
                                          <div
                                                key={notif.notif_id}
                                                className={`flex items-center justify-between p-2 rounded-md ${
                                                      notif.is_read ? "bg-gray-100" : "bg-gray-50"
                                                }`}
                                          >
                                                <div className="flex items-center gap-2">
                                                      {getIcon(notif.notif_type)}
                                                      <div className="flex flex-col">
                                                            <span className="text-sm font-medium">{notif.message}</span>
                                                            <span className="text-xs text-gray-500">{timeAgo(notif.created_at)}</span>
                                                      </div>
                                                </div>
                                                {!notif.is_read && (
                                                      <Button
                                                            size="sm"
                                                            variant="outline"
                                                            onClick={() => markAsRead(notif.notif_id)}
                                                      >
                                                            Mark as read
                                                      </Button>
                                                )}
                                          </div>
                                    ))
                              )}
                        </div>

                        <DialogFooter>
                              <Button onClick={onClose}>
                                    Close
                              </Button>
                        </DialogFooter>
                  </DialogContent>
            </Dialog>
      );
}