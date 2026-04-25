import type { LucideIcon } from "lucide-react";

export type Page = 'dashboard' | 'orders' | 'products' | 'customers' | 'promo';

export type MenuItemsType = {
      id: Page;
      label: string;
      icon: LucideIcon;
      path: string;
      badge?: number; // optional
};