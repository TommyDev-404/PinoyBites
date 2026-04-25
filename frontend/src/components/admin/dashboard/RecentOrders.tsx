
import { Card, CardContent, CardHeader, CardDescription, CardTitle } from '@/components/ui/card';
import { Package,  } from 'lucide-react';
import type { RecentOrdersInfo } from '@/types/admin/dashboard.types';
import { getStatusBadge } from '@/utils/StatusBadge';

interface RecentActivityProps{
      orders: RecentOrdersInfo[];
}

export default function RecentOrders({ orders }: RecentActivityProps){
      
      return (
            <Card>
                  <CardHeader>
                        <CardTitle>Recent Orders</CardTitle>
                        <CardDescription>Latest customer orders</CardDescription>
                  </CardHeader>
                  <CardContent>
                  {orders.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-10 text-center text-gray-500 dark:text-gray-400">
                              <Package className="w-10 h-10 mb-3 text-gray-400" />
                              <p className="font-medium">No recent orders</p>
                              <p className="text-sm">New orders will appear here</p>
                        </div>
                  ) : (
                        <div className="space-y-4">
                              {orders.map((order) => (
                                    <div key={order.order_id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div>
                                          <p className="font-medium">{order.users.username}</p>
                                          <p className="text-sm text-gray-500">{`ORDR-GWAPOKO${order.order_id}`} • {new Date(order.order_date).toLocaleDateString('en-PH', { month: 'long', day: '2-digit', year: 'numeric'})}</p>
                                    </div>
                                    <div className="text-right">
                                          <p className="font-semibold">₱{order.total_price}</p>
                                          {getStatusBadge(order.status)}
                                    </div>
                                    </div>
                              ))}
                        </div>
                  )}
                  </CardContent>
            </Card>
      );
}