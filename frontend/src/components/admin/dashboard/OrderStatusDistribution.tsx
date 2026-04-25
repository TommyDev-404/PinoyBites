import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import type { OrderStatusDistributionType } from "@/types/admin/dashboard.types";
import { getStatusBadge } from "@/utils/StatusBadge";
import { BarChart3 } from "lucide-react";

interface OrderStatusDistributionProps{
      order_distribution: OrderStatusDistributionType[];
}


export default function OrderStatusDistribution({ order_distribution } : OrderStatusDistributionProps){

      return (
            <Card>
                  <CardHeader>
                        <CardTitle>Order Status Distribution</CardTitle>
                        <CardDescription>Current order statuses</CardDescription>
                  </CardHeader>

                  <CardContent>
                        {order_distribution.length === 0 ? (
                              <div className="flex flex-col items-center justify-center py-10 text-center text-gray-500 dark:text-gray-400">
                                    <BarChart3 className="w-10 h-10 mb-3 text-gray-400" />
                                    <p className="font-medium">No order data available</p>
                                    <p className="text-sm">Status distribution will appear here</p>
                              </div>
                        ) : (
                              <div className="space-y-4">
                                    {order_distribution.map((status, index) => {

                                          return (
                                                <div key={index}>
                                                      <div className="flex items-center justify-between mb-2">
                                                            <div className="flex items-center gap-2">
                                                                  {getStatusBadge(status.order_status)}
                                                                  <span className="text-sm text-gray-600">{status.count} orders</span>
                                                            </div>
                                                            <span className="text-sm font-semibold">{status.percentage}%</span>
                                                      </div>
                                                      <div className="w-full bg-gray-200 rounded-full h-2">
                                                            <div className="bg-amber-600 h-2 rounded-full" style={{ width: `${status.percentage}%` }}/>
                                                      </div>
                                                </div>
                                          );
                                    })}
                              </div>
                        )}
                  </CardContent>
            </Card>
      );
}