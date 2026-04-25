import {
      Dialog,
      DialogContent,
      DialogHeader,
      DialogTitle,
      DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ViewLocationMap } from "../ViewLocation";
import type { AdminAllOrdersInfo } from "@/types/admin/orders.types";


type Props = {
      order: AdminAllOrdersInfo;
      open: boolean;
      onClose: () => void;
};

export default function OrderInfoModal({ order, open, onClose }: Props) {
      if (!order) return null;

      const formatDate = (date: string) =>
            new Date(date).toLocaleDateString();

      return (
            <Dialog open={open} onOpenChange={onClose}>
                  <DialogContent className="max-w-3xl">
                        <DialogHeader>
                              <DialogTitle>Order #{order.order_id}</DialogTitle>
                              <DialogDescription>
                                    Complete order details and customer information
                              </DialogDescription>
                        </DialogHeader>
            
                        <div className="space-y-6 max-h-150 overflow-y-auto">
                              {/* Customer Info */}
                              <div className="border rounded-xl p-4 space-y-3">
                                    <h2 className="font-semibold text-lg">Customer Info</h2>
                        
                                    <div className="grid grid-cols-2 gap-4">
                                          <div>
                                                <Label className="text-gray-500">Name</Label>
                                                <p className="font-medium">{order.users.username}</p>
                                          </div>
                                          <div>
                                                <Label className="text-gray-500">Contact</Label>
                                                <p className="font-medium">{order.users.contact_num}</p>
                                          </div>
                                    </div>
                              </div>
                  
                              {/* Order Info */}
                              <div className="border rounded-xl p-4 space-y-3">
                              <h2 className="font-semibold text-lg">Order Info</h2>
                  
                              <div className="grid grid-cols-2 gap-4">
                                    <div>
                                    <Label className="text-gray-500">Date & Time</Label>
                                    <p className="font-medium">
                                    {formatDate(order.order_date)} • {order.order_time}
                                    </p>
                                    </div>
                  
                                    <div>
                                    <Label className="text-gray-500">Status</Label>
                                    <div className="mt-1">
                                    {order.status}
                                    </div>
                                    </div>
                  
                                    <div>
                                    <Label className="text-gray-500">Payment</Label>
                                    <p className="font-medium">{order.payment_method}</p>
                                    </div>
                  
                                    <div>
                                    <Label className="text-gray-500">Promo</Label>
                                    <p className="font-medium">{order.promo_code}</p>
                                    </div>
                              </div>
                  
                              {order.special_instruction && (
                                    <div>
                                    <Label className="text-gray-500">Instructions</Label>
                                    <p className="font-medium">{order.special_instruction}</p>
                                    </div>
                              )}
                              </div>
                  
                              {/* Items */}
                              <div className="border rounded-xl p-4 space-y-3">
                              <h2 className="font-semibold text-lg">Items</h2>
                  
                              <div className="divide-y">
                                    {order.order_items.map((item) => (
                                    <div
                                    key={item.product_id}
                                    className="flex justify-between py-2"
                                    >
                                    <div>
                                          <p className="font-medium">{item.name}</p>
                                          <p className="text-sm text-gray-500">
                                          Qty: {item.quantity}
                                          </p>
                                    </div>
                  
                                    <p className="font-medium">
                                          ₱{(Number(item.price) * item.quantity).toFixed(2)}
                                    </p>
                                    </div>
                                    ))}
                              </div>
                              </div>
                  
                              {/* Total */}
                              <div className="flex justify-between items-center border-t pt-4">
                              <span className="text-lg font-semibold">Total</span>
                              <span className="text-2xl font-bold text-amber-600">
                                    ₱{order.total_price}
                              </span>
                              </div>
                  
                              {/* Address */}
                              <div className="space-y-2">
                              <Label className="text-gray-500">Delivery Address</Label>
                              <p className="font-medium">{order.shipping_address}</p>
                  
                              <ViewLocationMap
                                    location={{
                                          lat: 9.8500,  // mock latitude (Bohol-ish area)
                                          lng: 124.1435, // mock longitude
                                          address: order.shipping_address,
                                    }}
                                    customerName={order.users.username}
                              />
                              </div>
                        </div>
                  </DialogContent>
            </Dialog>
      );
}