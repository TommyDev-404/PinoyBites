import {
      Dialog,
      DialogContent,
      DialogHeader,
      DialogTitle,
      DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { useAdminViewProduct } from "@/hooks/admin/products.hooks";
import OverlaySpinner from "@/components/shared/OverlaySpinner";


type ProductModalProps = {
      product_id: number;
      open: boolean;
      onClose: () => void;
};

export default function ProductViewModal({ product_id, open, onClose }: ProductModalProps) {
      const { data: viewSpecificProduct, isLoading: viewSpecificProductLoading } = useAdminViewProduct(product_id);
      const product = viewSpecificProduct?.product;

      if (viewSpecificProductLoading) return <OverlaySpinner open={viewSpecificProductLoading} message="Retrieving data..."/>;

      return (
            <Dialog open={open} onOpenChange={onClose}>

                  <DialogContent className="max-w-3xl">
                        <DialogHeader>
                              <DialogTitle className="text-xl font-bold">
                              Product Details
                              </DialogTitle>

                              <DialogDescription>
                              View complete information about this product.
                              </DialogDescription>
                        </DialogHeader>

                        {/* BODY */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                              {/* IMAGE */}
                              <div className="w-full h-56 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                              {product?.image_url}
                              </div>

                              {/* INFO */}
                              <div className="space-y-3">

                              {/* NAME + CATEGORY + PRICE */}
                              <div>
                                    <h2 className="text-lg font-bold text-gray-900">
                                          {product?.name}
                                    </h2>

                                    <p className="text-sm text-gray-500">
                                          {product?.category} • ₱{product?.price}
                                    </p>
                              </div>

                              {/* DESCRIPTION */}
                              <p className="text-sm text-gray-600">
                                    {product?.description}
                              </p>

                              {/* RATING */}
                              <div className="flex items-center gap-2">
                                    <Star className="text-yellow-500 fill-yellow-500" size={18} />
                                    <span className="font-medium">
                                    {Number(product?.avg_rating || 0).toFixed(1)}
                                    </span>
                                    <span className="text-xs text-gray-500">
                                    ({product?.total_reviews} reviews)
                                    </span>
                              </div>

                              </div>
                        </div>

                        {/* INGREDIENTS */}
                        <div className="mt-6">
                              <h3 className="font-semibold mb-2">Ingredients</h3>
                              <div className="flex flex-wrap gap-2">
                              {product?.ingredients.map((item, i) => (
                              <Badge key={i} variant="outline">
                                    {item}
                              </Badge>
                              ))}
                              </div>
                        </div>

                        {/* STEPS */}
                        <div className="mt-6">
                              <h3 className="font-semibold mb-2">Steps</h3>
                              <ol className="list-decimal pl-5 space-y-1 text-sm text-gray-600">
                              {product?.steps.map((step, i) => (
                              <li key={i}>{step}</li>
                              ))}
                              </ol>
                        </div>
                  </DialogContent>
            </Dialog>
      );
}