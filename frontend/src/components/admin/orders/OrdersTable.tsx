import { Card, CardContent, CardHeader, CardDescription, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CheckCircle, Clock, Loader, Package, Trash2, XCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Eye, Filter, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useModal } from '@/context/modal.context';
import { useAdminAllOrders, useAdminUpdateOrderStatus } from '@/hooks/admin/orders.hooks';
import { useDebounce } from '@/hooks/useDebounce';
import type { OrderStatus } from '@/types/user/order.types';
import AdminLoading from '@/components/shared/AdminLoading';
import OrderInfoModal from './OrderInfo';
import type { AdminAllOrdersInfo } from '@/types/admin/orders.types';

export default function OrdersTable(){
      
      const [modalOpen, setModalOpen] = useState<{ open: boolean; payload: AdminAllOrdersInfo | null;}>
      ({
            open: false,
            payload: null,
      });
      const [searchQuery, setSearchQuery] = useState('');
      const [statusFilter, setStatusFilter] = useState('All');
      const [currentPage, setCurrentPage] = useState(1);
      const itemsPerPage = 8;

      const debouncedSearch = useDebounce(searchQuery, 300);

      const { mutate: updateOrderStatus } = useAdminUpdateOrderStatus();
      const { data: allOrdersData, isLoading } = useAdminAllOrders(statusFilter, debouncedSearch);
      const orders = allOrdersData?.orders ?? [];

      const totalPages = Math.ceil(orders.length / itemsPerPage);

      const paginatedOrders = orders.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
      );
      
      const openOrderDetailsModal = (order_id: number) => {
            const order = orders.find((o) => o.order_id === order_id);

            if (!order) return;

            setModalOpen({
                  open: true,
                  payload: order,
            });
      };

      const getStatusBadge = (status: string) => {
		const variants: Record<string, { variant: 'default' | 'secondary' | 'destructive' | 'outline', icon: any }> = {
			pending: { variant: 'outline', icon: Clock },
			confirmed: { variant: 'default', icon: CheckCircle },
			delivered: { variant: 'secondary', icon: CheckCircle },
			cancelled: { variant: 'destructive', icon: XCircle },
		};

		const config = variants[status] || variants.pending;
		const Icon = config.icon;

		return (
			<Badge variant={config.variant} className="flex items-center gap-1 w-fit">
				<Icon size={12} />
				{status}
			</Badge>
		);
      };

      const handleUpdateStatus = (order_id: number, status: OrderStatus) => {
            updateOrderStatus({ order_id, status});
      }

      const hideStatus = (status: OrderStatus) => {
            let hiddenStatus = [];

            switch(status) {
                  case "Processing": 
                        hiddenStatus.push("Pending");
                  break;
                  case "In_Transit": 
                        hiddenStatus.push("Pending", "Processing");
                  break;
                  case "Delivered": 
                        hiddenStatus.push("Pending", "Processing", "In_Transit");
                  break;
                  case "Cancelled": 
                        hiddenStatus.push("Pending", "Processing", "In_Transit", "Delivered");
                  break;
                  default: 
                        return;
            }

            return hiddenStatus;
      };
      
      return (
            <Card>
                  <CardHeader>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                              <div>
                                    <CardTitle>Orders Management</CardTitle>
                                    <CardDescription>View and manage customer orders</CardDescription>
                              </div>
                              <div className="flex flex-col sm:flex-row gap-2">
                                    <div className="relative">
                                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                          <Input
                                                placeholder="Search orders..."
                                                className="pl-10 w-full sm:w-64"
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                          />
                                    </div>

                                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                                          <SelectTrigger className="w-full sm:w-40">
                                                <Filter size={16} className="mr-2" />
                                                <SelectValue />
                                          </SelectTrigger>
                                          <SelectContent>
                                                <SelectItem value="All">All Status</SelectItem>
                                                <SelectItem value="Pending">Pending</SelectItem>
                                                <SelectItem value="Processing">Processing</SelectItem>
                                                <SelectItem value="In_Transit">In-Transit</SelectItem>
                                                <SelectItem value="Delivered">Delivered</SelectItem>
                                                <SelectItem value="Cancelled">Cancelled</SelectItem>
                                                <SelectItem value="Refunded">Refunded</SelectItem>
                                          </SelectContent>
                                    </Select>
                              </div>
                        </div>
                  </CardHeader>

                  <CardContent>
                        <div className="overflow-x-auto">
                              <Table>
                                    <TableHeader>
                                          <TableRow>
                                                <TableHead className="text-center">Order ID</TableHead>
                                                <TableHead className="text-center">Customer</TableHead>
                                                <TableHead className="text-center">Items</TableHead>
                                                <TableHead className="text-center">Total</TableHead>
                                                <TableHead className="text-center">Date & Time</TableHead>
                                                <TableHead className="text-center">Status</TableHead>
                                                <TableHead className="text-center">Actions</TableHead>
                                          </TableRow>
                                    </TableHeader>
                                    <TableBody className='text-center'>
                                          {paginatedOrders.length > 0 ?
                                                paginatedOrders.map((order) => (
                                                      <TableRow key={order.order_id}>
                                                            <TableCell className="font-medium">{`ORDR-GWAPOKO${order.order_id}`}</TableCell>
                                                            <TableCell>
                                                                  <div>
                                                                        <p className="font-medium">{order.users?.username}</p>
                                                                        <p className="text-xs text-gray-500">{order.users?.contact_num}</p>
                                                                  </div>
                                                            </TableCell>
                                                            <TableCell className="max-w-[200px]">
                                                                  <p className="text-sm truncate">{order.order_items.map((item) => `${item.name} (${item.quantity}x)`).join(", ")}</p>
                                                            </TableCell>
                                                            <TableCell className="font-semibold">₱{order.total_price}</TableCell>
                                                            <TableCell>
                                                                  <p className="text-sm">{new Date(order.order_date).toLocaleDateString('en-PH', { month: 'short', day: '2-digit', year: 'numeric'})}</p>
                                                                  <p className="text-xs text-gray-500">{order.order_time}</p>
                                                            </TableCell>
                                                            <TableCell>{getStatusBadge(order.status)}</TableCell>
                                                            <TableCell>
                                                                  <div className="flex items-center justify-center gap-2">
                                                                        <Button onClick={() => openOrderDetailsModal(order.order_id)} variant="ghost" size="icon">
                                                                              <Eye size={16} />
                                                                        </Button>

                                                                        <Select
                                                                              value={order.status}
                                                                              onValueChange={(value) => handleUpdateStatus(order.order_id, value as OrderStatus)}
                                                                        >
                                                                              <SelectTrigger className="w-32">
                                                                                    <SelectValue />
                                                                              </SelectTrigger>
                                                                              <SelectContent>
                                                                                    <SelectItem value="Pending" hidden={hideStatus(order.status as OrderStatus)?.includes('Pending') && true}>Pending</SelectItem>
                                                                                    <SelectItem value="Processing" hidden={hideStatus(order.status as OrderStatus)?.includes('Processing') && true}>Processing</SelectItem>
                                                                                    <SelectItem value="In_Transit" hidden={hideStatus(order.status as OrderStatus)?.includes('In_Transit') && true}>In-Transit</SelectItem>
                                                                                    <SelectItem value="Delivered" hidden={hideStatus(order.status as OrderStatus)?.includes('Delivered') && true}>Delivered</SelectItem>
                                                                                    <SelectItem value="Cancelled" hidden={hideStatus(order.status as OrderStatus)?.includes('Cancelled') && true}>Cancelled</SelectItem>
                                                                                    <SelectItem value="Refunded">Refunded</SelectItem>
                                                                              </SelectContent>
                                                                        </Select>
                                                                  </div>
                                                            </TableCell>
                                                      </TableRow>
                                                ))
                                          :
                                                <TableRow>
                                                      <TableCell colSpan={7} className="py-10">
                                                            <div className="flex flex-col items-center justify-center text-center text-gray-500">
                                                                  <Package className="w-8 h-8 mb-2 text-gray-400" />
                                                                  <p className="font-medium">No orders found.</p>
                                                            </div>
                                                      </TableCell>
                                                </TableRow>
                                          }
                                    </TableBody>
                              </Table>

                              <div className="flex items-center justify-between mt-4">
                                    <p className="text-sm text-gray-500">
                                          Page {currentPage} of {totalPages || 1}
                                    </p>

                                    <div className="flex gap-2">
                                          {[...Array(totalPages)].map((_, i) => (
                                                <Button
                                                      key={i}
                                                      variant={currentPage === i + 1 ? "default" : "outline"}
                                                      size="sm"
                                                      onClick={() => setCurrentPage(i + 1)}
                                                >
                                                {i + 1}
                                                </Button>
                                          ))}
                                    </div>

                                    <div className="flex items-center gap-2">
                                          <Button
                                                variant="outline"
                                                size="sm"
                                                disabled={currentPage === 1}
                                                onClick={() => setCurrentPage((prev) => prev - 1)}
                                          >
                                                Prev
                                          </Button>

                                          <Button
                                                variant="outline"
                                                size="sm"
                                                disabled={currentPage === totalPages}
                                                onClick={() => setCurrentPage((prev) => prev + 1)}
                                          >
                                                Next
                                          </Button>
                                    </div>
                              </div>
                        </div>
                  </CardContent>

                  { modalOpen.open &&
                        <OrderInfoModal
                              order={modalOpen.payload!}
                              open={true} 
                              onClose={() => setModalOpen({ open : false, payload: null })}
                        />
                  }
            </Card>
      );
}