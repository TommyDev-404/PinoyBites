import { ImageWithFallback } from "@/assets/figma/ImageWithFallback";
import {
      Dialog,
      DialogContent,
      DialogHeader,
      DialogTitle,
} from "@/components/ui/dialog";
import type { ProductType, ViewProductRecipe } from "@/types/user/products.types";

type Product = {
      name: string;
      image: string;
      ingredients: string[];
      steps: string[];
};

type ProductInfoModalProps = {
      product: ViewProductRecipe;
      open: boolean;
      onClose: () => void;
};

export default function ProductInfoModal({ product, open, onClose }: ProductInfoModalProps) {
      console.log(product)

      return (
            <Dialog open={open} onOpenChange={onClose}>
                  <DialogContent className="max-w-md">
            
                        <DialogHeader>
                              <DialogTitle>{product.name}</DialogTitle>
                        </DialogHeader>

                        <ImageWithFallback
                              src={product.image_url}
                              alt={product.name}
                              className="w-full h-48 object-cover rounded-lg"
                        />
            
                        <div className="space-y-4 mt-4">
            
                              <div>
                                    <h3 className="font-semibold text-sm mb-2">Ingredients</h3>
                                    <ul className="list-disc pl-5 text-sm text-gray-600">
                                          {product.ingredients.map((item, i) => (
                                                <li key={i}>{item}</li>
                                          ))}
                                    </ul>
                              </div>
            
                              <div>
                                    <h3 className="font-semibold text-sm mb-2">Steps</h3>
                                    <ol className="list-decimal pl-5 text-sm text-gray-600">
                                          {product.steps.map((step, i) => (
                                                <li key={i}>{step}</li>
                                          ))}
                                    </ol>
                              </div>
                  
                        </div>
                  </DialogContent>
            </Dialog>
      );
}