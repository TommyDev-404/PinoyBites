import { CartItem } from '@/components/user/cart/CartItem';
import { CartSummary } from '@/components/user/cart/CartSummary';
import { useModal } from '@/context/modal.context';
import { motion } from 'framer-motion';
import TrustIndicator from '@/components/shared/TrustIndicators';
import { useAuth } from '@/context/auth.context';
import EmptyCart from '@/components/user/cart/EmptyCart';
import PageHeader from '@/components/user/cart/PageHeader';
import { pageWidth } from '@/utils/padding';
import { useCarts, useRemoveCartItem, useUpdateCartItem, useUserPromo } from '@/hooks/user/cart.hooks';
import type { CheckOutPayload } from '@/types/user/cart.types';
import { useState } from 'react';
import PlaceOrderModal from '@/components/user/cart/PlaceOrder';

const DELIVERY_FEE = 4.99;

export default function CartPage() {
      const { user } = useAuth();
      const { setModalOpen } = useModal();

      const [checkoutOpen, setCheckoutOpen] = useState(false);
      const [checkoutPayload, setCheckoutPayload] = useState<CheckOutPayload | null>(null);
      
      const { mutate: updateCartItem } = useUpdateCartItem();
      const { mutate: removeCartItem } = useRemoveCartItem();
      const { data: cartData, isLoading } =  useCarts(user?.user_id!);
      const { data: userPromoData } = useUserPromo(user?.user_id!);

      const carts = cartData?.cart_items ?? [];
      const subtotal = carts.reduce((sum, item) => sum + item.products.price * (item.quantity ?? 0), 0);
      const total = parseFloat((subtotal + DELIVERY_FEE).toFixed(2));

      const promoName = userPromoData?.promo.tier_name ?? "None";
      const discount = userPromoData?.promo.discount ?? 0;
      const amountDiscounted = total * (discount / 100);

      const handleUpdateQuantity = (product_id: number, quantity: number) => {
            updateCartItem({ user_id: user?.user_id!, product_id, quantity });
      };

      const handleRemoveItem = (product_id: number) => {      
            setModalOpen({ 
                  modalToOpen: 'removeConfirmation',
                  message: 'Are you sure you want to remove this item? It will be permanently remove after this.',
                  actionName: 'Remove',
                  function: () => removeCartItem({ user_id: user?.user_id!, product_id })
            });
      };

      const handleCheckout = () => {
            if (!user) {
                  setModalOpen({ modalToOpen: 'loginModal' });
                  return;
            }
      
            const payload: CheckOutPayload = {
                  products: carts.map(item => ({
                        product_id: item.products.product_id,
                        name: item.products.name,
                        image_url: item.products.image_url,
                        price: item.products.price,
                        subtotal: subtotal,
                        delivery_fee: DELIVERY_FEE,
                        quantity: item.quantity
                  })),
                  totalPrice: promoName !== "None" ? total - amountDiscounted : total
            };
      
            setCheckoutPayload(payload);
            setCheckoutOpen(true);
      };

      
      if (carts.length === 0) return <EmptyCart/>;

      return (
            <>
                  <section className={`${pageWidth}`}>
                        {/* Header */}
                        <PageHeader cartItemsCount={carts.length}/>

                        {/* Cart Content */}
                        <div className="grid lg:grid-cols-3 gap-8">
                              {/* Cart Items */}
                              <div className="lg:col-span-2">
                                    <motion.div
                                          initial={{ opacity: 0, y: 30 }}
                                          whileInView={{ opacity: 1, y: 0 }}
                                          viewport={{ once: true, amount: 0.3 }}
                                          transition={{ duration: 0.30 }}
                                          className="bg-white rounded-lg border border-gray-200 p-6 max-h-105 overflow-y-auto"
                                    >
                                          {carts.map((item, index) => (
                                                <motion.div
                                                      key={index}
                                                      initial={{ opacity: 0, y: 30 }}
                                                      whileInView={{ opacity: 1, y: 0 }}
                                                      viewport={{ once: true, amount: 0.1 }} // the trigger when to show the component
                                                      transition={{ duration: 0.25, delay: index * 0.1 }} // stagger effect
                                                >
                                                      <CartItem
                                                            key={item.cart_id}
                                                            item={item.products}
                                                            quantity={item.quantity!}
                                                            onUpdateQuantity={handleUpdateQuantity}
                                                            onRemove={handleRemoveItem}
                                                      />
                                                </motion.div>
                                          ))}
                                    </motion.div>
                              </div>

                              {/* Order Summary */}
                              <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.3 }}
                                    transition={{ duration: 0.25 }}
                                    className="lg:col-span-1"
                              >
                                    <CartSummary
                                          promoName={promoName!}
                                          discount={discount}
                                          amountDiscounted={amountDiscounted}
                                          subtotal={subtotal}
                                          deliveryFee={DELIVERY_FEE}
                                          total={total}
                                          onCheckout={handleCheckout}
                                    />
                              </motion.div>
                        </div>

                        <TrustIndicator/>
                  </section>
                  
                  {checkoutOpen &&
                        <PlaceOrderModal 
                              open={true} 
                              onClose={() => setCheckoutOpen(false)} 
                              payload={checkoutPayload!}
                        />
                  }
            </>
      );
}
