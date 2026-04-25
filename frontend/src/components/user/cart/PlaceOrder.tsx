import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
      Dialog,
      DialogContent,
      DialogHeader,
      DialogTitle,
      DialogFooter,
      DialogDescription
} from "@/components/ui/dialog"
import {
      Select,
      SelectContent,
      SelectItem,
      SelectTrigger,
      SelectValue
} from "@/components/ui/select"
import {
      MapPin,
      CreditCard,
      Calendar,
      Clock
} from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { capitalizeWords  } from '@/utils/helper';
import { useNavigate } from "react-router-dom"
import type { CheckOutPayload } from "@/types/user/cart.types"
import { usePlaceOrder } from "@/hooks/user/order.hooks"
import type { PaymentMethod, PlaceOrderInfo } from "@/types/user/order.types"
import { useModal } from "@/context/modal.context"
import { useAccount } from "@/hooks/user/account.hooks"
import type { AccountInfoType } from "@/types/user/account.types"


type Props = {
      payload: CheckOutPayload,
      open: boolean
      onClose: () => void
}

export default function PlaceOrderModal({ payload, open, onClose }: Props) {
      const cartItems = payload.products;
      const { setModalOpen } = useModal();

      const { data: userAccountInfo, isLoading } = useAccount();
      const user = userAccountInfo?.user;

      const navigate = useNavigate();
      const [isSubmitting, setIsSubmitting] = useState(false)

      const {
            register,
            handleSubmit,
            setValue,
            watch,
            reset,
            formState: { errors }
      } = useForm<PlaceOrderInfo>()
      const watchPaymentMethod = watch("payment_method")

      // autofill the form 
      useEffect(() => {
            if (userAccountInfo?.user) {
                  reset({
                        user_id: userAccountInfo.user.user_id,
                        order_date: new Date().toISOString().split("T")[0],
                        order_time: "06:00",
                        payment_method: "COD",
                        shipping_address: userAccountInfo.user.address,
                        total_price: payload.totalPrice,
                        product_items: cartItems
                  });
            }
      }, [userAccountInfo, reset, payload.totalPrice, cartItems]);

      const { mutate: placeOrder } = usePlaceOrder();
      
      const onSubmit = (data: PlaceOrderInfo) => {
            setIsSubmitting(true);
            placeOrder(data);
            setModalOpen({ modalToOpen: null });
            navigate('/order-success');
      };

      return (
            <Dialog open={open} onOpenChange={onClose}>
                  <DialogContent className="max-w-xl">

                        <DialogHeader>
                              <DialogTitle>Place Your Order</DialogTitle>
                              <DialogDescription>
                                    Review your order and enter delivery details.
                              </DialogDescription>
                        </DialogHeader>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-h-[80vh] overflow-auto px-1">

                              {/* DELIVERY DETAILS */}
                              <div className="space-y-4">
                                    <h3 className="flex items-center gap-2 font-semibold">
                                          <MapPin size={18} className="text-amber-600" />
                                          Delivery Details
                                    </h3>

                                    <div className="space-y-2">
                                          <Label>Address *</Label>
                                          <Textarea
                                                placeholder="Enter delivery address"
                                                {...register("shipping_address", {
                                                      required: "Address required",
                                                      onChange: (e) => setValue("shipping_address", capitalizeWords(e.target.value))
                                                      }
                                                )}
                                          />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                          <div className="space-y-2">
                                                <Label>
                                                      <Calendar className="inline mr-1" size={14} />
                                                      Delivery Date
                                                </Label>

                                                <Input
                                                      type="date"
                                                      min={new Date().toISOString().split("T")[0]}
                                                      {...register("order_date")}
                                                />
                                          </div>

                                          <div className="space-y-2">
                                                <Label>
                                                      <Clock className="inline mr-1" size={14} />
                                                      Delivery Time
                                                </Label>

                                                <Select
                                                      onValueChange={(v) => setValue("order_time", v)}
                                                      defaultValue="06:00"
                                                >
                                                      <SelectTrigger>
                                                            <SelectValue />
                                                      </SelectTrigger>

                                                      <SelectContent>
                                                            <SelectItem value="06:00">6:00 AM - 8:00 AM</SelectItem>
                                                            <SelectItem value="08:00">8:00 AM - 10:00 AM</SelectItem>
                                                            <SelectItem value="10:00">10:00 AM - 12:00 PM</SelectItem>
                                                            <SelectItem value="14:00">2:00 PM - 4:00 PM</SelectItem>
                                                            <SelectItem value="16:00">4:00 PM - 6:00 PM</SelectItem>
                                                      </SelectContent>
                                                </Select>
                                          </div>
                                    </div>

                                    <div className="space-y-2">
                                          <Label>Special Instructions</Label>
                                          <Textarea
                                                placeholder="Ring doorbell..."
                                                {...register("special_instructions")}
                                          />
                                    </div>

                              </div>

                              {/* PAYMENT METHOD */}
                              <div className="space-y-4">

                                    <h3 className="flex items-center gap-2 font-semibold">
                                          <CreditCard size={18} className="text-amber-600" />
                                          Payment Method
                                    </h3>

                                    <RadioGroup
                                          defaultValue="COD"
                                          onValueChange={(v) => setValue("payment_method", v as PaymentMethod)}
                                    >

                                    <div className="flex items-center space-x-2 p-3 border rounded-lg">
                                          <RadioGroupItem value="COD" id="COD" />
                                          <Label htmlFor="COD">Cash on Delivery</Label>
                                    </div>

                                    <div className="flex items-center space-x-2 p-3 border rounded-lg">
                                          <RadioGroupItem value="Gcash" id="Gcash" />
                                          <Label htmlFor="Gcash">GCash</Label>
                                    </div>

                                    </RadioGroup>

                                    {watchPaymentMethod === "Gcash" && (
                                          <div className="p-4 bg-blue-50 border rounded">
                                                <p className="font-semibold">GCash Number</p>
                                                <p>+63 917 123 4567</p>
                                          </div>
                                    )}

                              </div>

                              {/* TOTAL */}
                              <div className="flex justify-between font-semibold text-lg">
                                    <span>Total:</span>
                                    <span>₱{payload.totalPrice.toFixed(2)}</span>
                              </div>

                              {/* ACTION BUTTONS */}
                              <DialogFooter className="flex gap-3">

                                    <Button
                                          type="submit"
                                          disabled={isSubmitting}
                                          className="w-full bg-amber-600 hover:bg-amber-700 text-white"
                                    >
                                          {isSubmitting
                                                ? "Placing Order..."
                                                : `Place Order - ₱${payload.totalPrice.toFixed(2)}`
                                          }
                                    </Button>

                              </DialogFooter>

                        </form>

                  </DialogContent>
            </Dialog>
      )
}