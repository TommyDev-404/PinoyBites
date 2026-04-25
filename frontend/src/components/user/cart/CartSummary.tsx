
import { Button } from '@/components/ui/button';

interface CartSummaryProps {
      subtotal: number;
      deliveryFee: number;
      total: number;
      onCheckout: () => void;
      promoName: string,
      discount: number,
      amountDiscounted: number
}

export function CartSummary({ subtotal, deliveryFee, total, onCheckout, promoName,  discount, amountDiscounted}: CartSummaryProps) {

      return (
            <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-4">
                  <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                  
                  <div className="space-y-3 mb-4">
                        <div className="flex justify-between">
                              <span className="text-gray-600">Subtotal</span>
                              <span className="font-medium">₱{subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                              <span className="text-gray-600">Delivery Fee</span>
                              <span className="font-medium">₱{deliveryFee.toFixed(2)}</span>
                        </div>

                        {promoName !== "None" && (
                              <div className="bg-green-50 border border-green-200 rounded-lg p-3 space-y-1">
                                    <div className="flex justify-between items-center">
                                          <span className="text-sm font-semibold text-green-700">
                                                Promo Applied
                                          </span>
                                          <span className="text-sm font-medium text-green-700">
                                                -₱{amountDiscounted.toFixed(2)}
                                          </span>
                                    </div>

                                    <div className="flex justify-between text-sm text-green-600">
                                          <span>{promoName}</span>
                                          <span>{discount}% OFF</span>
                                    </div>
                              </div>
                        )}

                        <div className="border-t border-gray-300 pt-3 flex justify-between items-center">
                              <span className="text-lg font-bold">Total</span>
                              <span className="text-2xl font-bold">
                                    ₱{(total - amountDiscounted).toFixed(2)}
                              </span>
                        </div>
                  </div>

                  <Button
                        className="w-full h-12 text-lg"
                        onClick={onCheckout}
                  >
                        Proceed to Checkout
                  </Button>

                  <p className="text-xs text-center text-gray-500 mt-4">Taxes calculated at checkout</p>
            </div>
      );
}
