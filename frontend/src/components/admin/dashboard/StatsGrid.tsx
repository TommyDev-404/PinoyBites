import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, DollarSign, Package, ShoppingBag } from 'lucide-react';

interface StatsGridProps{
      totalOrders: number;
      todayOrders: number;
      pendingOrders: number;
      totalRevenue: number;
      totalProducts: number;
}

export default function StatsGrid({ totalOrders, todayOrders, pendingOrders, totalRevenue, totalProducts }: StatsGridProps){
      
      return(
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                              <CardTitle className="text-sm font-medium text-gray-600">Total Orders</CardTitle>
                              <ShoppingBag className="text-amber-600" size={20} />
                        </CardHeader>
                        <CardContent>
                              <div className="text-2xl font-bold text-gray-900">{totalOrders}</div>
                              <p className="text-xs text-gray-500 mt-1">
                                    <span className="text-green-600 font-semibold">+{todayOrders}</span> today
                              </p>
                        </CardContent>
                  </Card>

                  <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                              <CardTitle className="text-sm font-medium text-gray-600">Pending Orders</CardTitle>
                              <Clock className="text-orange-600" size={20} />
                        </CardHeader>
                        <CardContent>
                              <div className="text-2xl font-bold text-gray-900">{pendingOrders}</div>
                              <p className="text-xs text-gray-500 mt-1">Needs action</p>
                        </CardContent>
                  </Card>

                  <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                              <CardTitle className="text-sm font-medium text-gray-600">Total Revenue</CardTitle>
                              <DollarSign className="text-green-600" size={20} />
                        </CardHeader>
                        <CardContent>
                              <div className="text-2xl font-bold text-gray-900">₱{totalRevenue ?? 0}</div>
                              <p className="text-xs text-gray-500 mt-1">All time</p>
                        </CardContent>
                  </Card>

                  <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                              <CardTitle className="text-sm font-medium text-gray-600">Total Products</CardTitle>
                              <Package className="text-blue-600" size={20} />
                        </CardHeader>
                        <CardContent>
                              <div className="text-2xl font-bold text-gray-900">{totalProducts ?? 0}</div>
                              <p className="text-xs text-gray-500 mt-1">In catalog</p>
                        </CardContent>
                  </Card>
            </div>
      );
}