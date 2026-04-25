import type { MenuItemsType } from "@/types/admin/menu.types";
import { Bell, Moon, Settings, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePageHeader } from "@/context/header.context";
import AdminNotificationsModal from "./AdminNotificationModal";
import { useState } from "react";
import { Switch } from "../ui/switch";
import { useAdminNotificationsNotReadCount } from "@/hooks/admin/notification.hooks";

interface HeaderProps {
      menuItems: MenuItemsType[];
}

export default function Header({ menuItems }: HeaderProps) {
      const { header } = usePageHeader();
      const { data: notifNotReadData } = useAdminNotificationsNotReadCount();
      const notifCount = notifNotReadData?.count ?? 0;

      const [ isModalOpen, setModalOpen ] = useState(false); // modal context

      const openNotificationsModal = () => setModalOpen(true);
      const closeNotificationsModal = () => setModalOpen(false);

      return (
            <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
                  <div>
                        <h1 className="text-xl font-bold text-gray-900">
                              {menuItems.find(item => item.id === header)?.label}
                        </h1>
                        <p className="text-xs text-gray-500">
                              {header === 'dashboard' && 'Overview of your business'}
                              {header === 'orders' && 'Manage customer orders'}
                              {header === 'products' && 'Manage product catalog'}
                              {header === 'customers' && 'View customer information'}
                              {header === 'promo' && 'Create and manage discount codes and special offers.'}
                              {header === 'feedbacks' && 'View and manage customer feedback and ratings.'}
                        </p>
                  </div>
                  <div className="flex items-center gap-3">
                        <Button
                              onClick={openNotificationsModal}
                              variant="ghost"
                              size="icon"
                              className="relative"
                        >
                              <Bell size={20} />

                              {notifCount > 0 && (
                                    <span className="absolute top-0.5  right-1 min-w-[18px] h-[18px] px-1 flex items-center justify-center text-[10px] font-semibold text-white bg-red-500 rounded-full leading-none">
                                          {notifCount > 99 ? "99+" : notifCount}
                                    </span>
                              )}
                        </Button>

                        {/* Dark Mode Toggle */}
                        <div className="flex items-center gap-2">
                              <Sun size={16} />
                              <Switch checked={true} />
                              <Moon size={16} />
                        </div>
                  </div>

                  {/* Modal */}
                  <AdminNotificationsModal
                        open={isModalOpen}
                        onClose={closeNotificationsModal}
                  />
            </header>
      );
}