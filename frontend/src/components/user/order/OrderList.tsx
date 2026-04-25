import { ImageWithFallback } from "@/assets/figma/ImageWithFallback";
import type { OrdersInfo } from "@/types/user/order.types";
import { motion } from "framer-motion";

type OrderListProps = {
      order: OrdersInfo;
      index: number;
      handleConfirmCancelOrder: (id: number) => void;
}

export default function OrderList({ order, index, handleConfirmCancelOrder } : OrderListProps){
      
      return(
            <motion.div
                        key={order.order_id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.1 }} // the trigger when to show the component
                        transition={{ duration: 0.25, delay: index * 0.1 }} // stagger effect
                        className="border border-gray-200 rounded-lg p-6"
            >
                  
                  {/* Order Header */}
                  <div className="flex justify-between items-center mb-4">
                        <div>
                              <p className="font-semibold">Order #{order.order_id}</p>
                              <p className="text-sm text-gray-500">ID: ORDR-GWAPOKO{order.order_id}</p>
                              <p className="text-sm text-gray-500">
                                    Placed on {new Date(order.order_date).toLocaleDateString('en-PH', { year: 'numeric', month: 'short', day: 'numeric' })}
                              </p>
                        </div>
                        <span
                              className={`px-3 py-1 rounded-full text-white text-sm font-semibold ${
                                    order.status === "Delivered"
                                    ? "bg-green-500"
                                    : order.status === "Pending"
                                    ? "bg-yellow-500"
                                    : "bg-red-500"
                              }`}
                        >
                              {order.status}
                        </span>
                  </div>

                  {/* Items */}
                  <div className="space-y-3">
                        {order?.order_items.map(item => (
                              <div key={item.product_id} className="flex items-center gap-4">
                                    <ImageWithFallback
                                          src={item.image_url}
                                          alt={item.name}
                                          className="w-16 h-16 object-cover rounded"
                                    />
                                    <div className="flex-1">
                                          <p className="font-semibold">{item.name}</p>
                                          <p className="text-sm text-gray-500">
                                                {item.quantity} x ${item.price}
                                          </p>
                                    </div>

                                    <div>
                                          <p className="flex items-center gap-2 text-stone-400 text-xs">
                                                Subtotal: 
                                                <span className="font-semibold text-base text-stone-800">₱{item.subtotal}</span>
                                          </p>

                                          <p className="flex items-center gap-2 text-stone-400 text-xs">
                                                Delivery Fee: 
                                                <span className="font-semibold text-base text-stone-800">₱{item.delivery_fee}</span>
                                          </p>
                                    </div>
                              </div>
                        ))}
                  </div>

                  {/* Order Footer: Total + Cancel */}
                  <div className="mt-4 flex justify-between items-center">
                        <p className="font-semibold">Total: ₱{order.total_price}</p>
                        {order.status === "Pending" && (
                              <button
                                    onClick={() => handleConfirmCancelOrder(order.order_id)}
                                    className="text-white rounded-sm hover:bg-red-600 text-sm bg-red-500 py-1 px-4"
                              >
                                    Cancel Order
                              </button>
                        )}
                  </div>
            </motion.div>
      );
}