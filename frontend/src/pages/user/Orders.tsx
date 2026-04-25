import { useNavigate } from "react-router-dom";
import TrustIndicator from "@/components/shared/TrustIndicators";
import { useModal } from "@/context/modal.context";
import EmptyOrders from "@/components/user/order/EmptyOrder";
import OrderList from "@/components/user/order/OrderList";
import { pageWidth } from "@/utils/padding";
import { useCancelOrder, useOrders } from "@/hooks/user/order.hooks";
import { useAuth } from "@/context/auth.context";
import { useState } from "react";
import type { OrderStatus } from "@/types/user/order.types";

export default function Orders() {
      const { user } = useAuth();
      const { setModalOpen } = useModal();
      const [ orderStatus, setOrderStatus ] = useState<OrderStatus>('Pending');
      
      const { data: ordersData, isLoading } = useOrders(user?.user_id!, orderStatus);
      const orders = ordersData?.orders ?? [];
      const { mutate: cancelOrder } = useCancelOrder();
      
      const handleConfirmCancelOrder = (order_id: number) => {
            setModalOpen({ 
                  modalToOpen: 'removeConfirmation',
                  message: 'Are you sure you want to cancel this order? It will be permanently cancelled after this.',
                  actionName: 'Cancel Order',
                  function: () => cancelOrder({ user_id: user?.user_id!, order_id: order_id })
            });
      };

      return (
            <section className={`${pageWidth}`}>
                  
                  {/* Page Title */}
                  <h1 className="text-3xl md:text-4xl font-bold mb-2">Orders History</h1>

                  {/* Description */}
                  <p className="text-gray-600 mb-6">
                        View and track all your snack orders. Monitor deliveries, check pending purchases,
                        or review cancelled orders anytime.
                  </p>

                  {/* Count + Filter Row */}
                  <div className="flex items-center justify-between mb-6">
                        
                        {/* Order Count */}
                        <p className="text-gray-500">
                              {orders.length === 0
                              ? "No orders found." : `${orders.length} ${orders.length === 1 ? "order" : "orders"} found.`}
                        </p>
                        {/* Filter */}
                        <select
                              onChange={(e) => setOrderStatus(e.target.value as OrderStatus)}
                              defaultValue="Pending"
                              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                        >
                              <option value="All">All</option>
                              <option value="Pending">Pending</option>
                              <option value="Processing">Processing</option>
                              <option value="In_Transit">In Transit</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled</option>
                              <option value="Returned">Returned</option>
                        </select>

                  </div>

                  {/* Orders List */}
                  <div className="space-y-6 mt-6 h-120 overflow-y-auto">
                        {orders.length !== 0 ?
                              orders?.map((order, index) => (
                                    <OrderList
                                          key={index}
                                          order={order}
                                          index={index}
                                          handleConfirmCancelOrder={handleConfirmCancelOrder}
                                    />
                              ))
                        : 
                              <EmptyOrders />
                        }
                  </div>

                  {/* Info / Trust Indicators */}
                  <TrustIndicator />
            </section>
      );
}