import { Bell, Inbox } from "lucide-react";
import { useModal } from "@/context/modal.context";
import { pageWidth } from "@/utils/padding";
import { useNotifications, useMarkNotificationRead, useMarkAllNotificationsRead } from "@/hooks/user/notifications.hooks";
import { useAuth } from "@/context/auth.context";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import NotifOrderDetailsModal from "@/components/user/notification/NotifOrderDetails";
import type { ViewOrderPayload } from "@/types/user/notification.types";
import type { OrderStatus } from "@/types/user/order.types";

export default function NotificationsPage() {
      const { user } = useAuth();
      const [modal, setModal] = useState(false);
      const [ notifPayload, setPayload ] = useState<ViewOrderPayload | null>(null);

      const { data: notificationsData, isLoading } = useNotifications(user?.user_id!);
      const notifications = notificationsData?.notifications ?? [];
      console.log(notifications);

      const { mutate: markIndividualNotificationRead } = useMarkNotificationRead();
      const { mutate: markAllNotificationsRead } = useMarkAllNotificationsRead();

      const unreadCount = notifications.filter((n) => !n.is_read).length; // unread notifications

      const handleViewOrder = (notif_id: number, order_id: number, status: OrderStatus) => {
            markIndividualNotificationRead({ user_id: user?.user_id!, notif_id });
            
            setModal(true);
            setPayload({
                  user_id: user?.user_id!,
                  notif_id,
                  order_id,
                  status
            });
      };

      const handleMarkRead = (notif_id: number) => {
            markIndividualNotificationRead({ user_id: user?.user_id!, notif_id });
      };

      return (
            <>
                  <section className={`${pageWidth}`}>
                        {/* Header */}
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-2">
                              <div>
                              <div className="flex items-center gap-2 text-2xl font-bold">
                                    <Bell size={28} /> Notifications
                              </div>
                              <p className="text-sm text-gray-500 mt-1">
                                    Here you can view all your recent notifications and check the status of your orders.
                              </p>
                              </div>

                              <div className="flex items-center gap-4 mt-3 md:mt-0">
                                    {notifications.length > 0 && (
                                          <button
                                          onClick={() => markAllNotificationsRead({ user_id: user?.user_id! })}
                                          className="px-4 py-2 bg-amber-500 text-white rounded-lg text-sm hover:bg-amber-600 transition"
                                          >
                                          Mark All as Read
                                          </button>
                                    )}

                                    {unreadCount > 0 && (
                                          <span className="px-2 py-1 bg-red-500 text-white rounded-full text-sm font-semibold">
                                          {unreadCount} Unread
                                          </span>
                                    )}
                              </div>
                        </div>

                        {/* Notifications List */}
                        <div className="space-y-4 max-h-[70vh] overflow-y-auto p-4">
                              {notifications.length === 0 ? (
                                    <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex items-center flex-col">
                                          <Inbox size={80} className="opacity-20" />
                                          <span className="text-md mt-2">No notifications yet.</span>
                                    </div>
                              ) : (
                                    notifications.map((n, index) => (
                                          <div
                                                key={index}
                                                className={`relative p-4 md:p-5 border rounded-2xl shadow-sm hover:shadow-md transition flex flex-col gap-4 ${
                                                      !n.is_read ? "bg-amber-50" : "bg-white"
                                                }`}
                                          >
                                                {/* Unread Indicator */}
                                                {!n.is_read && (
                                                      <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
                                                )}

                                                {/* Top Section */}
                                                <div className="flex items-start gap-4">
                                                      {/* Icon */}
                                                      <div
                                                            className={`flex items-center justify-center w-11 h-11 rounded-full shrink-0 ${
                                                            n.notif_type === "order_cancelled" 
                                                            ? "bg-red-100 text-red-700"
                                                            : "bg-emerald-100 text-emerald-700"
                                                            }`}
                                                      >
                                                            <Bell size={20} />
                                                      </div>

                                                      {/* Message */}
                                                      <div className="flex-1">
                                                            <p className="font-semibold text-gray-800 leading-snug">{n.message}</p>

                                                            <p className="text-xs text-gray-500 mt-1">
                                                                  {new Date(n.created_at).toLocaleDateString("en-US", {
                                                                        month: "short",
                                                                        day: "2-digit",
                                                                        year: "numeric",
                                                                  })}
                                                            </p>
                                                      </div>
                                                </div>

                                                {/* Divider */}
                                                <div className="border-t" />

                                                {/* Actions */}
                                                {!['promo', 'review'].includes(n.notif_type)  ?
                                                      <div className="flex flex-col sm:flex-row gap-2 sm:justify-end">
                                                            {/* Secondary */}
                                                            <button
                                                                  onClick={() => handleViewOrder(n.notif_id, n.orders.order_id, n.status)}
                                                                  className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                                                            >
                                                                  View Order
                                                            </button>

                                                            {/* Primary */}
                                                      </div>
                                                : ['promo', 'review'].includes(n.notif_type) && !n.is_read ?
                                                      <div className="flex justify-end">
                                                            <Button onClick={() => handleMarkRead(n.notif_id)}>
                                                                  Mark as read
                                                            </Button>
                                                      </div>
                                                : null}
                                          </div>
                                    ))
                              )}
                        </div>

                  </section>

                  {modal && (
                        <NotifOrderDetailsModal
                              payload={notifPayload!}
                              open={true} 
                              onClose={() => setModal(false)}
                        />
                  )}
            </>
      );
}