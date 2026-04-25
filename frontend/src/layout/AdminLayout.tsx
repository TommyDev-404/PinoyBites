import { 
      LayoutDashboard, 
      ShoppingBag, 
      Package, 
      Users, 
      Gift,
      MessageCircleCheck,
} from 'lucide-react';
import Sidebar from '@/components/admin/Sidebar';
import type { MenuItemsType, Page } from '@/types/admin/menu.types';
import Header from '@/components/admin/Header';
import { Outlet } from 'react-router-dom';

const menuItems: MenuItemsType[] = [
      { id: 'dashboard' as Page, label: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
      { id: 'orders' as Page, label: 'Orders', icon: ShoppingBag, path: '/admin/orders', badge: 2 },
      { id: 'products' as Page, label: 'Products', icon: Package, path: '/admin/products', },
      { id: 'customers' as Page, label: 'Customers', icon: Users, path: '/admin/customers', },
      { id: 'feedback' as Page, label: 'Feedbacks', icon: MessageCircleCheck, path: '/admin/feedback', },
      { id: 'promo' as Page, label: 'Promo Management', icon: Gift, path: '/admin/promo', },
];

export default function AdminLayout() {
      return (
            <div className="flex h-screen bg-gray-50">
                  {/* Sidebar */}
                  <Sidebar menuItems={menuItems}/>

                  {/* Main Content */}
                  <main className="flex-1 overflow-hidden flex flex-col">
                        {/* Header */}
                        <Header menuItems={menuItems}/>

                        {/* Page Content */}
                        <div className="flex-1 overflow-y-auto p-6 relative">
                              <Outlet/>
                        </div>
                  </main>
            </div>
      );
}