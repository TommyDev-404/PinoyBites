import { useState } from "react"
import {
      Dialog,
      DialogContent,
      DialogHeader,
      DialogTitle,
      DialogFooter,
      DialogDescription,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useModal } from "@/context/modal.context"
import type { AddToCartModalProps } from "@/types/user/products.types"
import { useAddToCart } from "@/hooks/user/cart.hooks"
import { useAuth } from "@/context/auth.context"


export default function AddToCartModal({ product, open, onClose }: AddToCartModalProps) {
      const { user } = useAuth();
      const { setModalOpen } = useModal();
      const [quantity, setQuantity] = useState<number>(1);

      const { mutate: addToCart } = useAddToCart();
      
      const handleAddToCart = () => {
            // Add it to the context (handles existing items automatically)
            addToCart({ user_id: user?.user_id!, product_id: product.product_id, quantity });

            // Close modal
            onClose();
      };

      const increase = () => setQuantity((prev) => prev + 1)
      const decrease = () => {
            if (quantity > 1) setQuantity((prev) => prev - 1)
      }

      return (
            <Dialog
                  open={open}
                  onOpenChange={onClose}
            >
                  <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                              <DialogTitle>Add {product.name} to Cart</DialogTitle>
                              <DialogDescription>
                                    Select the quantity of {product.name} you want to add to your cart.
                              </DialogDescription>
                        </DialogHeader>
                  
                        <div className="flex items-center gap-4 py-4">
                              <Button variant="outline" onClick={decrease}>
                                    -
                              </Button>
                        
                              <Input
                                    type="number"
                                    value={quantity}
                                    onChange={(e) => setQuantity(Number(e.target.value))}
                                    className="w-20 text-center"
                              />
                        
                              <Button variant="outline" onClick={increase}>
                                    +
                              </Button>
                        </div>
                  
                        <DialogFooter>
                              <Button  onClick={handleAddToCart}>Add {quantity} to Cart</Button>
                        </DialogFooter>
                  </DialogContent>
            </Dialog>
      )
}