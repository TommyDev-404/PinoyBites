
import { Badge } from "@/components/ui/badge";
import type { OrderStatus } from "@/types/user/order.types";
import { CheckCircle, Clock, XCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const getStatusBadge = (status: OrderStatus) => {
      const variants: Record<OrderStatus,
            {
                  variant: 'default' | 'secondary' | 'destructive' | 'outline';
                  icon: LucideIcon;
                  className: string;
            }> 
      = {
            Pending: {
                  variant: 'outline',
                  icon: Clock,
                  className: 'bg-yellow-100 text-yellow-700 border-yellow-300'
            },
            Processing: {
                  variant: 'outline',
                  icon: Clock,
                  className: 'bg-teal-100 text-teal-700 border-teal-300'
            },
            In_Transit: {
                  variant: 'default',
                  icon: CheckCircle,
                  className: 'bg-blue-100 text-blue-700 border-blue-300'
            },
            Delivered: {
                  variant: 'secondary',
                  icon: CheckCircle,
                  className: 'bg-green-100 text-green-700 border-green-300'
            },
            Cancelled: {
                  variant: 'destructive',
                  icon: XCircle,
                  className: 'bg-red-100 text-red-700 border-red-300'
            },
            Returned: {
                  variant: 'destructive',
                  icon: XCircle,
                  className: 'bg-orange-100 text-orange-700 border-orange-300'
            },
            All: {
                  variant: 'outline',
                  icon: Clock,
                  className: 'bg-gray-100 text-gray-700 border-gray-300'
            },
      };

      const config = variants[status];
      const Icon = config.icon;

      return (
            <Badge
                  variant={config.variant}
                  className={`flex items-center gap-1 w-fit ${config.className}`}
            >
                  <Icon size={12} />
                  {status.replace('_', ' ')}
            </Badge>
      );
};