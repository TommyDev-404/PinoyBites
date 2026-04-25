import { useState } from "react";
import PinoyBitesLogo from '@/assets/PinoyBitesLogo.png';
import { Button } from '@/components/ui/button';
import { 
      LogOut,
      ChevronRight,
} from 'lucide-react';
import type { MenuItemsType } from "@/types/admin/menu.types";
import { NavLink } from "react-router-dom";
import { usePageHeader } from "@/context/header.context";
import { useAdminOrdersStatistics } from "@/hooks/admin/orders.hooks";
import { useAuth } from "@/context/auth.context";
import { useModal } from "@/context/modal.context";

interface SidebarProps{
      menuItems: MenuItemsType[];
}

export default function Sidebar({ menuItems } : SidebarProps){
      const { adminLogout } = useAuth();
      const { setModalOpen } = useModal();
      const { handleSetHeader } = usePageHeader();
      const { data: orderStatistics, isLoading } = useAdminOrdersStatistics();
      const recentOrderCount = orderStatistics?.order_stats.today ?? 0;

      const [sidebarOpen, setSidebarOpen] = useState(true);
      
      const adminUser = localStorage.getItem('adminUser') || 'Admin';
      
      const handleLogout = () => {
            setModalOpen({ 
                  modalToOpen: 'logoutConfirmation',
                  message: 'Are you sure you want to logout? You will be signed out after this.',
                  actionName: 'Logout',
                  function: adminLogout,
            });
      };

      return (
            <aside className={`${sidebarOpen ? "w-64" : "w-20"} bg-white border-r border-gray-200 transition-all duration-300 flex flex-col`}>     
                  {/* ================= LOGO ================= */}
                  <div className="h-16 border-b border-gray-200 flex items-center  px-3 relative">
                        <div className="flex items-center gap-2">
                              <img src={PinoyBitesLogo} alt="logo" className="w-12 h-12" />
                              <div className={`font-semibold transition-all duration-200 ease-in-out ${sidebarOpen ? 'opacity-100' : 'opacity-0'}`}>
                                    <div className={`text-amber-500 text-[14px]`}>
                                          Pinoy
                                    </div>
                                    <div className={` text-[18px] font-bold -mt-1`}>
                                          Bites
                                    </div>
                              </div>
                        </div>

                        {/* Toggle Button */}
                        <button
                              onClick={() => setSidebarOpen(!sidebarOpen)}
                              className="absolute -right-3 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-md hover:bg-gray-50"
                        >
                              <ChevronRight
                              size={14}
                              className={`transition-transform duration-300 ${
                              sidebarOpen ? "rotate-180" : ""
                              }`}
                              />
                        </button>
                  </div>

                  {/* ================= NAVIGATION ================= */}
                  <nav className="flex-1 py-6 px-3 space-y-1">
                        {menuItems.map((item) => {
                              const Icon = item.icon;

                              return (
                                    <div className="group relative">
                                          <NavLink
                                                key={item.id}
                                                to={item.path}
                                                onClick={() => handleSetHeader(item.id)}
                                                className={({ isActive }) =>
                                                      `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-100 ${
                                                      isActive
                                                      ? "bg-linear-to-r from-amber-500 to-orange-400 text-white font-semibold"
                                                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                                      }`
                                                }
                                          >     
                                                
                                                <Icon size={22} className="shrink-0" />

                                                {/* Collapsing label */}
                                                <span className={`text-sm whitespace-nowrap overflow-hidden transition-all duration-200 ${ sidebarOpen ? "opacity-100" : "opacity-0"}`}>
                                                      {item.label}
                                                </span>
                                                
                                                {item.id === 'orders' && recentOrderCount > 0 && (
                                                      <>
                                                      {sidebarOpen ? (
                                                            <span className="ml-auto inline-flex items-center justify-center px-1.5 py-1 text-[12px] font-bold leading-none text-white bg-red-500 rounded-full">
                                                            {recentOrderCount}
                                                            </span>
                                                      ) : (
                                                            // Small dot for collapsed sidebar        
                                                            <span className="absolute top-1/2 right-2 -translate-y-1/2 w-2 h-2 bg-red-500 rounded-full" />
                                                      )}
                                                      </>
                                                )}
                                          </NavLink>

                                          {/* Tooltip when collapsed */}
                                          {!sidebarOpen && (
                                                <span
                                                className="
                                                      pointer-events-none
                                                      absolute left-full top-1/2 -translate-y-1/2 ml-2
                                                      px-3 py-1.5
                                                      bg-gray-900 text-white text-sm
                                                      rounded-md shadow-lg
                                                      whitespace-nowrap
                                                      opacity-0 scale-95
                                                      group-hover:opacity-100 group-hover:scale-100
                                                      transition-opacity duration-300 ease-in-out
                                                      z-50
                                                "
                                                >
                                                {item.label}
                                                <span className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-black rotate-45" />
                                                </span>
                                          )}
                                    </div>
                              );
                        })}
                  </nav>

                  {/* ================= USER SECTION ================= */}
                  <div className="border-t border-gray-200 p-3">
                        {sidebarOpen ? (
                              <div className="space-y-3">
                              <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center text-white font-bold">
                                    {adminUser.charAt(0).toUpperCase()}
                              </div>

                              <div className="min-w-0">
                                    <p className="text-sm font-semibold text-gray-900 truncate">
                                    {adminUser}
                                    </p>
                                    <p className="text-xs text-gray-500">Administrator</p>
                              </div>
                              </div>

                              <Button
                              variant="outline"
                              onClick={handleLogout}
                              size="sm"
                              className="w-full justify-start"
                              >
                              <LogOut size={16} className="mr-2" />
                              Logout
                              </Button>
                              </div>
                        ) : (
                              <div className="relative group">
                                    <Button
                                          variant="ghost"
                                          size="icon"
                                          onClick={handleLogout}
                                          className="w-full"
                                    >
                                          <LogOut size={20} />
                                    </Button>

                                    {!sidebarOpen && (
                                          <span
                                                className="
                                                      pointer-events-none
                                                      absolute left-full top-1/2 -translate-y-1/2 ml-2
                                                      px-3 py-1.5
                                                      bg-black text-white text-sm
                                                      rounded-md shadow-lg
                                                      whitespace-nowrap
                                                      opacity-0 scale-95
                                                      group-hover:opacity-100 group-hover:scale-100
                                                      transition-all duration-150
                                                      z-50 
                                                "
                                          >
                                                Logout
                                                <span className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-black rotate-45" />
                                          </span>
                                    )}
                              </div>
                        )}
                  </div>
            </aside>
      );    
}